FROM node:18-alpine3.17

WORKDIR /app

COPY package.json .
COPY src ./src

RUN npm install --omit=dev

EXPOSE 2020
CMD npm run start
