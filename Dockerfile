# base
FROM node:16-alpine3.15 AS base
WORKDIR /usr/src/app
COPY package*.json ./
COPY tsconfig.json ./

# build
FROM base AS build
ENV NODE_ENV=development
RUN npm install
COPY . .
RUN npm run build

# production
FROM build AS production
ENV NODE_ENV=production
RUN npm ci
COPY . .
USER node
CMD [ "node", "consumer.mjs" ]

# dev
FROM build AS dev
RUN apk add --no-cache bash
RUN wget -O /bin/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh
RUN chmod +x /bin/wait-for-it.sh
ENV NODE_ENV=development
RUN npm install
COPY . .
USER node
CMD [ "node", "consumer.mjs" ]
