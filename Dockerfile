# Stage 1: Build the Angular app
FROM node:18-alpine AS buidler

WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application files to the working directory
COPY . .

ENV NODE_ENV="production"
ENV NG_APP_NAME="Wallety"
ENV NG_APP="prod-wallety-portal"
ENV NG_APP_USER_STORAGE_NAME="wallety-portal-prod-user"
ENV NG_APP_API_URL="https://walletyapp-staging-wallety.svc-eu2.zcloud.ws"

# Build the React application
RUN npm run build:production

# Production Stage
FROM nginx:alpine

# Copy main NGINX configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the Angular SSR app's browser build and SSR server file into the container
COPY --from=buidler /usr/src/app/dist/wallety-portal/browser /usr/share/nginx/html
COPY --from=buidler /usr/src/app/dist/wallety-portal/server /usr/share/nginx/server

WORKDIR /usr/src/app

# Add custom nginx config if needed
RUN chown -R nginx:nginx /usr/src/app && chmod -R 755 /usr/src/app && \
   chown -R nginx:nginx /var/cache/nginx && \
   chown -R nginx:nginx /var/log/nginx && \
   chown -R nginx:nginx /etc/nginx/conf.d

RUN touch /var/run/nginx.pid && \
   chown -R nginx:nginx /var/run/nginx.pid

USER nginx

# Expose ports for the NGINX server
EXPOSE 3000
EXPOSE 443
EXPOSE 80

# Command to start NGINX when the container is run
CMD ["nginx", "-g", "daemon off;"]