require('dotenv').config()
const confidence = require('confidence');

const config = {
  env: process.env.ENV || 'development',
  port: process.env.PORT,
  cors: {
    origins: process.env.CORS_ORIGINS,
    methods: process.env.CORS_METHODS,
    credentials: process.env.CORS_CREDENTIALS,
    allowHeaders: process.env.CORS_ALLOW_HEADERS,
    exposeHeaders: process.env.CORS_EXPOSE_HEADERS,
    preflightMaxAge: process.env.CORS_PREFLIGHT_MAX_AGE || 10,
  },
  crypto: {
    secretKey: process.env.CRYPTO_SECRET_KEY,
    saltRounds: process.env.CRYPTO_SALT_ROUND || 10,
  },
  basicAuthApi: [
    {
      username: process.env.BASIC_AUTH_USERNAME,
      password: process.env.BASIC_AUTH_PASSWORD
    }
  ],
  jwt: {
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY,
    signOptions: {
      algorithm: process.env.JWT_SIGNING_ALGORITHM,
      audience: process.env.JWT_AUDIENCE,
      secret_key: process.env.JWT_SECRET,
      issuer: process.env.JWT_ISSUER,
      expiresIn: process.env.JWT_EXPIRATION_TIME
    },
    verifyOptions: {
      algorithm: process.env.JWT_SIGNING_ALGORITHM,
      audience: process.env.JWT_AUDIENCE,
      secret_key: process.env.JWT_SECRET,
      issuer: process.env.JWT_ISSUER
    }
  },
  googleApi: {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri: process.env.REDIRECT_URI,
    project_id: process.env.PROJECT_ID,
    client_email: process.env.CLIENT_EMAIL,
    private_key: process.env.PRIVATE_KEY,
    database_id: process.env.DATABASE_ID
  },
  llm: {
    LLM_URL: process.env.LLM_URL,
  },
  redirectUrl: {
    redirect_url_frontend: process.env.REDIRECT_URL_FRONTEND,
    redirect_url_backend: process.env.REDIRECT_URL_BACKEND
  },
  session: {
    private_key_session: process.env.PRIVATE_KEY_SESSION
  },
  mongoDbUrl: process.env.MONGO_DATABASE_URL || 'mongodb://localhost:27017/sample',
  mysqlConfig: {
    connectionLimit: process.env.MYSQL_CONNECTION_LIMIT,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },
  postgresqlUrl: process.env.POSTGRESQL_URL || 'postgresql://postgres:121314@localhost:5432/sample',
  elasticsearch: {
    logging: process.env.ELASTICSEARCH_LOGGING,
    logPrefix: process.env.ELASTICSEARCH_LOG_PREFIX,
    logLabel: process.env.ELASTICSEARCH_LOG_LABEL,
    node: process.env.ELASTICSEARCH_NODE,
    username: process.env.ELASTICSEARCH_USERNAME,
    password: process.env.ELASTICSEARCH_PASSWORD
  },
  apm: {
    serviceName: process.env.ELASTIC_APM_SERVICE_NAME,
    secretToken: process.env.ELASTIC_APM_SECRET_TOKEN,
    serverUrl: process.env.ELASTIC_APM_SERVER_URL
  },
  ddTrace: {
    enable: process.env.DD_TRACE_ENABLED,
    env: process.env.DD_ENV,
    host: process.env.DD_AGENT_HOST,
  },
  monitoring: process.env.MONITORING || 0,
  kafka: {
    broker: process.env.KAFKA_HOST,
    username: process.env.KAFKA_USERNAME,
    password: process.env.KAFKA_PASSWORD,
  },
  rabbitmq: process.env.RABBITMQ_HOST || 'amqp://localhost',
  minio: {
    accessKey: process.env.MINIO_ACCESS_KEY || 'RTUd5KOO786vhAMZlELO',
    secretKey: process.env.MINIO_SECRET_KEY || 'Ho2GiKE3cHmMeYw8xwkEk9uc4xK1WYsA4H8xawVi',
    endPoint: process.env.MINIO_END_POINT || 'localhost',
    defaultImage: process.env.MINIO_DEFAULT_IMAGE,
    port: process.env.MINIO_PORT || 9000,
    extDomain: process.env.MINIO_EXT_DOMAIN,
    useSSL: process.env.MINIO_SSL || false,
  },
  alioss: {
    region: process.env.ALIOSS_REGION,
    accessKeyId: process.env.ALIOSS_ACCESS_KEY_ID || 'foo',
    accessKeySecret: process.env.ALIOSS_ACCESS_KEY_SECRET || 'bar',
    bucket: process.env.ALIOSS_BUCKET,
    endpoint: process.env.ALIOSS_END_POINT || 'foo.bar.com',
    subBucket: process.env.ALIOSS_SUB_BUCKET,
    topDir: process.env.ALIOSS_TOP_DIR,
  },
  aws: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  },
  storaging: process.env.STORAGING || 0,
  opentelemetry: {
    host: process.env.OPENTELEMETRY_HOST || 'http://localhost:4318',
  },
  storageProvider: process.env.STORAGE_PROVIDER || 'minio',
};

const store = new confidence.Store(config);

exports.get = key => store.get(key);
