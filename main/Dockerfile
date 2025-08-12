FROM alpine:3.22.1
RUN apk add --no-cache git npm
WORKDIR /app
COPY ./main/package.json .
RUN npm i
FROM alpine:3.22.1
RUN apk add --no-cache graphicsmagick nodejs
WORKDIR /app
COPY --from=0 /app/node_modules node_modules
COPY main main
CMD (cd work;node ../main/startServer.mjs)
