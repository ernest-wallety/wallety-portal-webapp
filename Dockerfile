# Build Stage
FROM node:18-alpine AS buidler
WORKDIR /app
# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
# Install dependencies
RUN npm ci
# Copy the rest of the application files to the working directory
COPY . .

RUN npm run build

FROM nginx:alpine
COPY --from=buidler /app/dist /usr/share/nginx/html
# Add custom nginx config if needed
EXPOSE 3000
EXPOSE 4200
EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]
