# Learning NestJS and Socket.io

This project was initialized with the following command to scaffold a [Nest](https://github.com/nestjs/nest) framework TypeScript starter project.

```shell
npx @nestjs/cli new --directory . <project-name>
```

Static code analysis is done by [ESLint](https://eslint.org/) and code formatting is done by [Prettier](https://prettier.io/).
These tools are used automatically to check the code using a [pre-commit](./.husky/pre-commit) [Git hook](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) set up by [husky](https://typicode.github.io/husky/#/) and [lint-staged](https://github.com/okonet/lint-staged).
In addition to the pre-commit hook, there is also a [prepare-commit-msg](./.husky/prepare-commit-msg) that will automatically append a [JIRA](https://www.atlassian.com/software/jira) issue number to the commit message.
The tools were installed using following command.

```shell
npx mrm@2 lint-staged
```

## Usage

The following sections describe the usage of this project.

### Installation

To set up and run this project locally, run the following command.
The command will install all the dependencies and set up the Git hooks.

```shell
npm install
```

### Running the app

To run this project locally, use one of the following commands.
There are some external dependencies that needs to be available before starting this project locally.
See the [External Dependencies](#external-dependencies) section for more information.

```shell
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

This project is also configured to run using Docker.
Docker Compose files are provided ([docker-compose.yml](./docker-compose.yml) and [docker-compose.local.yml](./docker-compose.local.yml)) that can be used to run this project using Docker.
A convenience script ([up](./scripts/up)) is provided to start this project as follows.

```shell
./scripts/up <service>
```

Furthermore, the Docker Compose is already configured to allow remote debugging.
In addition, a Visual Studio Code [launch.json](./.vscode/launch.json) is provided that can attach the debugger to the running container.

### Test

To test this project, use one of the following commands.
Note that the e2e (end-to-end) tests require the external dependencies to be available.

```shell
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

_Warning_: If the same database is reused for development and running the e2e tests, the contents of that database will be wiped.
As an alternative, a [test-e2e](./scripts/test-e2e) script is provided that can be used to run the e2e tests.
The script automatically start the external dependencies and configure a different database for the e2e tests.

### NestJS

Use the `@nestjs/cli` to create a resource.
The following example is the command used to generate the `captures` resource.

```shell
npx nest generate resource captures
```

The above command is roughly equivalent to the following series of commands.
The `dto` and `entities` have to be created manually.

```shell
npx nest generate module captures
npx nest generate controller captures
npx nest generate service captures
```

## External Dependencies

## Environment Variable(s)

The following is a combined list of environment variables and example values.

```dotenv
# APP
APP_PORT=3000
APP_URL=http://localhost:3000
```

## TODOs

- [x] Broadcast a message to connected users when someone connects or disconnects.
- [] Add support for nicknames.
- [x] Don’t send the same message to the user that sent it. Instead, append the message directly as soon as he/she presses enter.
- [] Add “{user} is typing” functionality.
- [x] Show who’s online.
- [x] Add private messaging.
