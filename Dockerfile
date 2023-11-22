FROM node:21-alpine3.17
WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json* .
RUN npm install

COPY . .
RUN npm run build
CMD ["npm", "start"]