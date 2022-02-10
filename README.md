## RabbitMQ + Node.js using Docker Compose

**Version**

```shell
export CONSUMER_VERSION=`npx -c 'echo "$npm_package_version"'`
```

**Build manually**

```shell
docker build . -t m99coder/rabbitmq-consumer:${CONSUMER_VERSION}-dev --target dev
docker run -it --name consumer m99coder/rabbitmq-consumer:${CONSUMER_VERSION}-dev /bin/bash -c 'whoami'
```

**Run**

```shell
docker compose up
docker compose exec consumer /bin/bash -c 'for i in {1..15}; do node publisher.mjs; done'
```

**Monitor**

```shell
# RabbitMQ management console
open http://localhost:15672

# `example` exchange
open http://localhost:15672/\#/exchanges/%2F/example

# `example.hello` queue
open http://localhost:15672/\#/queues/%2F/example.hello
```

**Maintain**

For the full list of available commands have a look [here](https://rabbitmq.com/rabbitmqctl.8.html).

```shell
docker compose exec rabbitmq /bin/bash -c 'rabbitmqctl cluster_status'
docker compose exec rabbitmq /bin/bash -c 'rabbitmqctl list_users'
docker compose exec rabbitmq /bin/bash -c 'rabbitmqctl list_permissions'
docker compose exec rabbitmq /bin/bash -c 'rabbitmqctl list_topic_permissions'
docker compose exec rabbitmq /bin/bash -c 'rabbitmqctl list_user_permissions rabbitmq'
docker compose exec rabbitmq /bin/bash -c 'rabbitmqctl list_user_topic_permissions rabbitmq'
docker compose exec rabbitmq /bin/bash -c 'rabbitmqctl list_vhosts'
```

```shell
docker compose exec rabbitmq /bin/bash -c 'rabbitmqctl environment'
docker compose exec rabbitmq /bin/bash -c 'rabbitmqctl list_bindings'
docker compose exec rabbitmq /bin/bash -c 'rabbitmqctl list_channels'
docker compose exec rabbitmq /bin/bash -c 'rabbitmqctl list_connections'
docker compose exec rabbitmq /bin/bash -c 'rabbitmqctl list_consumers'
docker compose exec rabbitmq /bin/bash -c 'rabbitmqctl list_exchanges'
docker compose exec rabbitmq /bin/bash -c 'rabbitmqctl list_queues'
docker compose exec rabbitmq /bin/bash -c 'rabbitmqctl ping'
docker compose exec rabbitmq /bin/bash -c 'rabbitmqctl report'
docker compose exec rabbitmq /bin/bash -c 'rabbitmqctl status'
```

```shell
docker compose exec rabbitmq /bin/bash -c 'rabbitmqctl list_global_parameters'
docker compose exec rabbitmq /bin/bash -c 'rabbitmqctl list_parameters'
docker compose exec rabbitmq /bin/bash -c 'rabbitmqctl list_operator_policies'
```

```shell
docker compose exec rabbitmq /bin/bash -c 'rabbitmqctl list_vhost_limits'
docker compose exec rabbitmq /bin/bash -c 'rabbitmqctl trace_off'
docker compose exec rabbitmq /bin/bash -c 'rabbitmqctl trace_on'
# other log levels are: debug, info, warning, error, none
docker compose exec rabbitmq /bin/bash -c 'rabbitmqctl set_log_level debug'
docker compose exec rabbitmq /bin/bash -c 'rabbitmqctl enable_feature_flag all'
docker compose exec rabbitmq /bin/bash -c 'rabbitmqctl list_feature_flags'
```

**Useful resources**

- [Dockerizing a Node.js web app](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
- [Docker and Node.js Best Practices](https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md)
- [Setting up Docker + TypeScript + Node](https://dev.to/dariansampare/setting-up-docker-typescript-node-hot-reloading-code-changes-in-a-running-container-2b2f)
- [How to use RabbitMQ and Node.js with Docker and Docker Compose](https://geshan.com.np/blog/2021/07/rabbitmq-docker-nodejs/)
- [Top-level await is available in Node.js modules](https://www.stefanjudis.com/today-i-learned/top-level-await-is-available-in-node-js-modules/)
- [ES6 Modules Today With TypeScript](https://styfle.dev/blog/es6-modules-today-with-typescript)
