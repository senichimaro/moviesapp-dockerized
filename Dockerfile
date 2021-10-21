FROM node:17-alpine

COPY . .
WORKDIR . .

RUN npm i
ENTRYPOINT [ "nodemon", "server.js" ]