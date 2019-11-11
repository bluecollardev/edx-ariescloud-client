# build angular app
FROM node:10.15.3-alpine


WORKDIR /usr/src/app


ADD package*.json ./
ADD angular.json ./
ADD ionic.config.json ./
ADD tsconfig*.json ./

ADD src ./src

RUN npm install @angular/cli --global
RUN npm install

