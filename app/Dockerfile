FROM node:12.18-alpine

RUN mkdir -p /usr/app

WORKDIR /usr/app/

COPY package.json ./

RUN yarn

COPY . ./