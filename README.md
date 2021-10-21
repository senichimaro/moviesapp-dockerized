# MERN Project
Nodejs serving Reactjs from script files. This [project](https://moviesapp-dockerized.herokuapp.com/) Dockerize an Application.

<img align="left" height="22" width="22" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/docker/docker.png" /> DockerHub image `senichimaro/moviesapp`

# Dockerization
Dockerization of this app involves:
1. Create the App
2. Create Dockerfile file
3. Config Dockerfile
4. Create the registry in DockerHub
5. Workflow in the CLI 

## Dockerfile : Create and Config
This projects is intentionally simple, so the configuration could change in larger or complex projects.
1. FROM
   - base platform (python/node/etc...) 
2. COPY . . 
   - (from current location to root)
3. WORKDIR . 
   - (current location)
4. RUN npm install
   - commands to be ran
5. ENTRYPOINT 
   - commands to be ran after `docker run [...]`
```
FROM node:12-alpine

COPY . .
WORKDIR .

RUN npm install
ENTRYPOINT [ "node", "server.js" ]
```

## Workflow in the CLI : from scratch in local
Each time there is a change the image have to be re-built, the tag re-linked, and the image re-pushed (steps 4, 5, and 6)

1. Code Ready
2. Create the registry in DockerHub
3. `docker login -u USERNAME`
4. `docker build -t [image-name] .` : create the image
5. `docker tag [image-name] USERNAME/[remote-project-name]` : link the image to the registry
6. `docker push USERNAME/[remote-project-name]` : push the image to the registry

