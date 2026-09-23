FROM node:24-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --omit=dev

COPY . .

RUN mkdir -p /usr/src/app/data /usr/src/app/storage/videos \
  && chown -R node:node /usr/src/app

ENV NODE_ENV=production
ENV PORT=3000

USER node

EXPOSE 3000

CMD ["node", "server.js"]
