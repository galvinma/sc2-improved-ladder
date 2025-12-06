# Build
FROM node:24-alpine AS builder

EXPOSE 5173

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]
