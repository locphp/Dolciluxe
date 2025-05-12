FROM node:18-alpine

WORKDIR /app

# Copy package files trước để tận dụng cache layer
COPY package.json package-lock.json ./

# Cài đặt dependencies
RUN npm ci --production

# Copy toàn bộ source code
COPY . .

# Expose port
EXPOSE 8080

# Chạy ứng dụng
CMD ["npm", "start"]