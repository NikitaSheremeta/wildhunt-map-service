FROM node:latest as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./ .

EXPOSE 83

CMD [ "npm", "start" ]
