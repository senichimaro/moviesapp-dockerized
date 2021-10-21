FROM node:17-alpine
RUN apk add --no-cache python g++ make

COPY . .
WORKDIR .

RUN npm i
ENTRYPOINT [ "nodemon", "server.js" ]