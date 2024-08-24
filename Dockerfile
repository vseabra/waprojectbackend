FROM node:21.2.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENTRYPOINT ["node", "dist/src/index.js"]
