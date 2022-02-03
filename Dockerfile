FROM node:lts-alpine AS build

WORKDIR /app
COPY package.json .
# COPY yarn.lock .
RUN yarn --non-interactive

COPY . .
RUN yarn build

CMD ["yarn", "prod"]
