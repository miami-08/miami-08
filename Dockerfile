# syntax=docker/dockerfile:1

FROM node:12.18.0
WORKDIR /var/www
COPY package.json ./package.json
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "server"]
