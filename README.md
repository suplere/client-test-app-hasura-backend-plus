# Quasar App (client-hasura)

A Quasar Framework app which use Hasura and Hasura Backend Plus as auth server.

Hasura Beckend Plus - auth JWT server based on nHost.io solution
nhost-sdk - in this time this use my fork of original nhost-sdk (add AuthId)

This is simple boilerplate which has these function:

- register new user - new user saves via Hasura beckend plus - user must be activated }via admin or via some lambda function)
- login user - active user may login to the app (admin must create some rule for user and app)
- use auth service - simple vue implementation of nhost-sdk to Vue app
- auth route guard - path posts are visible onlz for authenticated user

## Install the dependencies

```bash
yarn
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Lint the files

```bash
yarn run lint
```

### Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).

### Enviroment variables in quasar.conf.js

BACKEND_ENDPOINT - url to the Hasura Becked Plus server app
APP_ID - id of the App in Hasura

You must run own Hasura server and Hasura Becked Plus - this is tested with this release [Fork Hasura Beckend Plus](https://github.com/suplere/hasura-backend-plus) and [Fork Nost SDK](https://github.com/suplere/nhost-js-sdk).
