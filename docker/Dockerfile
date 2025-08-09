FROM node:20-alpine

WORKDIR /app

RUN apk update && apk upgrade && apk add --no-cache bash

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
