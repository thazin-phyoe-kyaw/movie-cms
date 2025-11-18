FROM node:18-alpine As build

RUN apk upgrade --update -q \
  && apk --no-cache -q add git
WORKDIR /usr/src/app

COPY package*.json /usr/src/app
COPY yarn.lock /usr/src/app

RUN npm install

COPY . /usr/src/app

RUN npm run build

EXPOSE 8080

CMD [ "npm", "start" ]

# Configure a healthcheck to validate that everything is up&running
HEALTHCHECK --timeout=10s CMD sh healthcheck.sh

