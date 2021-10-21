FROM node:12-alpine

COPY . .
WORKDIR .

RUN npm install
ENTRYPOINT [ "node", "server.js" ]