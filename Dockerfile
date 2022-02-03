FROM node:lts-alpine AS build

RUN apk update && apk add --no-cache fontconfig curl curl-dev && \
  mkdir -p /usr/share && \
  cd /usr/share \
  && curl -L https://github.com/Overbryd/docker-phantomjs-alpine/releases/download/2.11/phantomjs-alpine-x86_64.tar.bz2 | tar xj \
  && ln -s /usr/share/phantomjs/phantomjs /usr/bin/phantomjs \
  && phantomjs --version

WORKDIR /app
COPY package.json .
# COPY yarn.lock .
RUN yarn --non-interactive

COPY . .
RUN yarn build

CMD ["yarn", "prod"]
