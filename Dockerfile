FROM node:24-alpine
RUN apk add --no-cache ffmpeg
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --omit=dev --no-audit --no-fund
COPY . .
RUN chown -R node:node /usr/src/app
ENV NODE_ENV=production
ENV PORT=3000
USER node
EXPOSE 3000
CMD ["node","server.js"]
