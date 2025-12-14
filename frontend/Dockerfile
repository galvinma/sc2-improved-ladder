# Build
FROM node:24-alpine AS builder

RUN apk --no-cache add curl bash

EXPOSE 5173

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]
