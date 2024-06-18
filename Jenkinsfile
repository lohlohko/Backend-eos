@Library('shared-library')_
def deployImage = new DeployImage()
def devSecOps = new DevSecOps()
env.nodeName = ''

pipeline {
    parameters {
        string(name: 'PRODUCTION_NAMESPACE',       description: 'Production Namespace',                 defaultValue: 'telkomdev-prod')
        string(name: 'STAGING_NAMESPACE',          description: 'Staging Namespace',                    defaultValue: 'telkomdev-stage')
        string(name: 'DEVELOPMENT_NAMESPACE',      description: 'Development Namespace',                defaultValue: 'telkomdev-dev')
        string(name: 'PRODUCT_NAME',               description: 'Product Name',                         defaultValue: 'telkomdev')
        string(name: 'DOCKER_IMAGE_NAME',          description: 'Docker Image Name',                    defaultValue: 'backend-codebase-node')
    }
    agent none
    options {
        skipDefaultCheckout()
    }
    stages {
        stage( "Kill Old Build" ) {
            steps {
                script {
                    KillOldBuild()
                }   
            }   
        }
        stage('Checkout SCM') {
            agent { label "nodejs" }
            steps {
                checkout scm
                script {
                    echo "get COMMIT_ID"
                    sh 'echo -n $(git rev-parse --short HEAD) > ./commit-id'
                    commitId = readFile('./commit-id')
                    commitMessage = sh (script: 'git log -1 --pretty=%s --no-merges ${GIT_COMMIT}', returnStdout: true).trim()
                    commitAuthor = sh (script: 'git log -1 --pretty=%aN --no-merges ${GIT_COMMIT}', returnStdout: true).trim()
                }
                stash(name: 'ws', includes:'**,./commit-id')
            }  
        }
        stage('Initialize & GitLeaks Scan') {
            agent {
                docker {
                    alwaysPull true
                    image "playcourt/jenkins:gitleaks"
                    label "Docker"
                    args "-u root --entrypoint ''"
                }
            }
            steps {
                script { sh "rm -Rf *"}
                unstash "ws"
                script {
                    if(env.BRANCH_NAME == "master"){
                        envStage = "production"
                    } else if (env.BRANCH_NAME == "release"){
                        envStage = "staging"
                    } else if (env.BRANCH_NAME == "develop"){
                        envStage = "development"
                    }
                    devSecOps.gitleaks("${params.PRODUCT_NAME}","${params.DOCKER_IMAGE_NAME}")
                }
            }
        }
        stage('Test & Build') {
            parallel {
                stage('Unit Test') {
                    agent { label "nodejs" }
                    steps {
                        unstash 'ws'
                        script {
                            def node = tool name: 'NodeJS-14', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
                            env.PATH = "${node}/bin:${env.PATH}"
                            sh "npm install"
                            sh "npm run cover"
                            def scannerHome = tool 'SonarScanner' ;
                            withSonarQubeEnv('SonarQube') {
                                sh "${scannerHome}/bin/sonar-scanner"
                            }
                            deployImage.cleansingWS()
                        }
                    }
                }
                stage('Build') {
                    agent { label "Docker" }
                    steps {
                        unstash 'ws'
                        script {
                            env.nodeName = "${env.NODE_NAME}"
                            sh "docker build --rm --no-cache --pull -t ${params.DOCKER_IMAGE_NAME}:${BUILD_NUMBER}-${commitId} ."
                        }
                    }
                }
            }
        }
        stage("Vulnerability Scan") {
            parallel {
                stage("Trivy Scan") {
                    agent {
                        docker {
                            alwaysPull true
                            image "playcourt/jenkins:trivy"
                            label "${nodeName}"
                            args "-u root -v /var/run/docker.sock:/var/run/docker.sock --entrypoint '' "
                            reuseNode true
                        }
                    }
                    steps {
                        echo "Running on ${nodeName}"
                        script {
                            devSecOps.scanImage("${params.PRODUCT_NAME}","${params.DOCKER_IMAGE_NAME}","${params.DOCKER_IMAGE_NAME}:${BUILD_NUMBER}-${commitId}")
                        }
                    }
                }
                stage("Sonatype Scan") {
                    agent {
                        docker {
                            alwaysPull true
                            image "playcourt/jenkins:nodejs14"
                            label "Docker"
                            args "-u root -v /var/lib/jenkins/tools:/var/lib/jenkins/tools -v  /var/lib/jenkins/depedency-check/data:/usr/share/dependency-check/data --entrypoint ''  "
                        }
                    }
                    steps {
                        unstash "ws"
                        script {
                            devSecOps.dependencyCheck("${params.PRODUCT_NAME}","${params.DOCKER_IMAGE_NAME}")
                        }
                    }
                }
            }
        }
        stage('Deployment') {
            steps {
                node(nodeName as String) { 
                    echo "Running on ${nodeName}"
                    script {
                        if (env.BRANCH_NAME == 'master'){
                            echo "Deploying to ${envStage} "
                            deployImage.to_vsan("${commitId}")
                        } else if (env.BRANCH_NAME == 'release'){
                            echo "Deploying to ${envStage} "
                            deployImage.to_vsan("${commitId}")
                        } else if (env.BRANCH_NAME == 'develop'){
                            echo "Deploying to ${envStage} "
                            deployImage.to_vsan("${commitId}")
                        }   
                    }   
                }   
            }   
        }   
    }
    post {
        always {
            node("Docker") {
                TelegramNotif(currentBuild.currentResult)
	        }   
        }
        failure {
            node(nodeName as String) {
                script {
                    sh "docker rmi -f ${params.DOCKER_IMAGE_NAME}:${BUILD_NUMBER}-${commitId}"
                }
            }
        }
    }
}