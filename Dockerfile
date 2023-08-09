# STAGE: 1
FROM node:14-alpine as build
COPY package.json /app-stage-1/
WORKDIR /app-stage-1
RUN npm install
COPY . /app-stage-1
RUN npm run build
# We need this to download node-prune. size ~1.5 MB
# RUN apk --no-cache add curl
# RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | /bin/sh -s -- -b /usr/local/bin
# run node prune to prune dependencies. It Helped me to save ~38 MB. 
# RUN /usr/local/bin/node-prune

# STAGE: 2
FROM node:14-alpine
WORKDIR /usr/app
COPY --from=build /app-stage-1/node_modules /usr/app/node_modules
COPY --from=build /app-stage-1/package.json /usr/app/package.json
COPY --from=build /app-stage-1/.next /usr/app/.next
# COPY --from=build /app-stage-1/server.js /usr/app/server.js

EXPOSE 8080

ENV NODE_ENV production
CMD ["npm", "start"]