# Stage 1: Build the Angular app
FROM node:18-alpine AS buidler

WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application files to the working directory
COPY . .

# Define build-time arguments
ARG NODE_ENV
ARG NG_APP_NAME
ARG NG_APP
ARG NG_APP_USER_STORAGE_NAME
ARG NG_APP_MENU_STORAGE_NAME
ARG NG_APP_API_URL

# Set environment variables using build-time arguments
ENV NODE_ENV=$NODE_ENV
ENV NG_APP_NAME=$NG_APP_NAME
ENV NG_APP=$NG_APP
ENV NG_APP_USER_STORAGE_NAME=$NG_APP_USER_STORAGE_NAME
ENV NG_APP_MENU_STORAGE_NAME=$NG_APP_MENU_STORAGE_NAME
ENV NG_APP_API_URL=$NG_APP_API_URL
ENV BRANCH_NAME=$BRANCH_NAME

# Set the build environment based on the branch name
RUN if [ "$BRANCH_NAME" = "main" ] || [ "$BRANCH_NAME" = "master" ] || [ "$BRANCH_NAME" = "production" ]; then \
      npm run build:production; \
    elif [ "$BRANCH_NAME" = "development" ]; then \
      npm run build:development; \
    else \
      npm run build:local; \
    fi
    
# Stage 2: Run SSR with Node.js
FROM node:18-alpine AS server

WORKDIR /usr/src/app

# Copy built Angular SSR app from the buidler stage
COPY --from=buidler /usr/src/app/dist ./dist

# Expose port for Node SSR server
EXPOSE 3000
EXPOSE 443

# Command to start the Angular SSR server
CMD ["node", "dist/wallety-portal/server/server.mjs"]
