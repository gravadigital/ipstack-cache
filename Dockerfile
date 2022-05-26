FROM node:14.17-alpine

RUN apk add --update git openssh curl curl-dev && rm -rf /tmp/* /var/cache/apk/*
RUN npm config set registry http://registry.npmjs.org && npm cache clean --force
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install --unsafe-perm && npm cache clean --force
COPY . /usr/src/app
RUN rm -rf .env && touch .env

CMD ["npm", "start"]
