FROM alpine
RUN apk add --no-cache git npm
WORKDIR /app
COPY ./main/package.json .
RUN npm i
FROM alpine
RUN apk add --no-cache graphicsmagick nodejs
WORKDIR /app
COPY --from=0 /app/node_modules node_modules
COPY . althea
CMD (cd work;node ../althea/main/startServer.mjs)
