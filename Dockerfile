# syntax=docker/dockerfile:1
FROM node:12.18.0 as build
WORKDIR /var/www
COPY package.json ./package.json
RUN npm install
COPY . .
RUN npm run build

FROM node:12.18.0
COPY --from=build /var/www/package.json ./package.json
RUN npm install
COPY --from=build /var/www/dist /dist
COPY --from=build /var/www/app.js ./app.js
EXPOSE 3000
CMD ["npm", "run", "server"]
