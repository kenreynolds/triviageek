# Run Angular live dev server for local development
# FROM node:20-alpine AS dev

# WORKDIR /usr/src/app
# COPY . /usr/src/app

# RUN npm install -g @angular/cli@15.2.8
# RUN npm install

# EXPOSE 4200
# CMD ["ng", "serve", "--host", "0.0.0.0"]

# Build Angular app for production deployment to K8s
# Stage 0 "build", based on Node.js, to build and compile the frontend
FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json /app/

RUN npm install
COPY ./ /app/

ARG configuration=production
RUN npm run build -- --output-path=./dist/triviageek --configuration $configuration

# Stage 1, base on nginx, to have only the compiled app, ready for production with nginx
FROM nginx:alpine
COPY --from=build /app/dist/triviageek /usr/share/nginx/html

# Copy the default nginx configuration
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
