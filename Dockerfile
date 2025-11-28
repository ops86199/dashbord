FROM node:18-alpine

WORKDIR /app

# Copy backend
COPY backend/package.json backend/server.js ./backend/

# Copy entire frontend folder
COPY public ./public

# Install backend dependencies
RUN cd backend && npm install

# Expose the correct port
EXPOSE 30000

# Start backend server
CMD ["node", "backend/server.js"]

