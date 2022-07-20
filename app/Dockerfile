FROM node:14.19-alpine

RUN mkdir -p /usr/app

WORKDIR /usr/app/

COPY package.json ./

RUN yarn

COPY . ./