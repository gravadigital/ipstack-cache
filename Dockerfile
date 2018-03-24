FROM node:latest
MAINTAINER Ivan Huayraña

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "start" ]

EXPOSE 3000
