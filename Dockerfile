FROM node:18-alpine

WORKDIR /app
COPY backend/package.json backend/server.js ./backend/
COPY public/index.html ./public/

RUN cd backend && npm install

EXPOSE 8081
CMD ["node", "backend/server.js"]
