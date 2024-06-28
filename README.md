# Node.js Codebase Backend
This Project was initialized to accelerate the beginning of the backend development process written in javascript by providing some pre-configured and ready-to-use common modules. This codebase is based on a clean architecture that represents DDD and CQRS patterns. 

## Project Structure
- [ ] `bin/`
  - [ ] `app/`: serve routing endpoint.
  - [ ] `auth/`: contains auth middleware.
  - [ ] `helpers/`
    - [ ] `components/`: contains third parties / external apps.
    - [ ] `databases/`: contains database configurations and commands.
    - [ ] `error/`: contains http error messages.
    - [ ] `http-status/`: contains http status codes.
    - [ ] `utils/`: contains utility library.
  - [ ] `infra/`
    - [ ] `config/`: define the app configuration.
  - [ ] `modules/`: define the core domain.
    - [ ] `user/`: user subdomain.
      - [ ] `handlers/`: defines call handlers from repositories.
      - [ ] `repositories/`: contains user commands and queries.
      - [ ] `utils/`: contains domain utils.
    - [ ] `<subdomainN>`
- [ ] `docs/`: contains api documentation
  - [ ] `postman/`: consist postman collection
  - [ ] `swagger/`: consist swagger docs
- [ ] `test/`: contains testing purpose.
  - [ ] `integration/`
  - [ ] `unit/`

## Getting Started
### Prerequisites

What things you need to install to run this project:

```
- Node.js v14.16.0
- Node Package Manager v6.14.11
- MongoDB / PostgreSQL / MySQL
- Elastic APM + Prometheus / Datadog Agent
```

**Note:** Elastic APM needs Elasticsearch and Kibana installed on your machine.

### Quick Start
To run this project, make sure that all prerequisites above are installed on your machine. Steps on how to initialize and run this project are as follows:

1. Clone this repo to your local machine

2. Rename the directory to service name as you see fit, don't forget to edit package.json by providing the project information:
   ```
   {
     "name": "codebase-backend",
     "version": "1.0.0",
     "description": "Repo for codebase backend",
     ...
   ```

3. Install dependencies:
   ```
   $ npm install
   ```

4. Duplicate `.env.example`, then rename it to `.env`

5. In `.env` file, make sure all values within `< >` tags are provided. Some details on how to properly add the values are as follows:

   1. `APP_ENV` set an application’s environment. Its value should be `prod`, `stage` or `dev`. 

      **Note:** The value of `prod` would disable api documentation of swagger ui to be accessed.

   2. `MONITORING` can be `0`, `1` or `2` with the default value is being `0`. This variable define which monitoring stacks are used in your apps.
      
      - `0`: Without monitoring stacks
      - `1`: Elastic APM + Prometheus
      - `2`: Datadog Agent


6. Start the server:
   ```
   $ npm start
   ```

### Running the tests

Just simply use this command to run the automated tests:
```
$ npm run test
```

Get coverage value for this system:
```
$ npm run cover
```

### Check coding style with lint analysis ###
It is encouraged to run lint analysis before push your code to make sure that there are no issues on your coding style / formatting
```
$ npm run lint
```

To fix simple error code format, run this command
```
$ npm run lint:fix
```

### Built With

* [Restify] The rest framework used
* [Npm] - Dependency Management
* [Docker] - Container Management

### Authors

* **TelkomDev** - *Initial work* - [Gitlab](https://gitlab.playcourt.id/telkomdev)


### License

This project is licensed under Telkom Indonesia License - see the [LICENSE.md](LICENSE.md) file for details

### Acknowledgments

* For sample file README.md, see [WIKI](https://gitlab.playcourt.id/telkomdev/codebase-backend/wikis/Readme.md-Sample) in this repository.
