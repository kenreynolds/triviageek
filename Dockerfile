# Stage 0, "build-stage" based on Node.js, to build and compile the frontend
FROM node:20.9.0 as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
ARG configuration=production
RUN npm run build -- --output-path=./dist/out --configuration $configuration

# Stage 1, based on NGINX, to have only the complied app, ready for production with NGINX
FROM nginx:1.27

# Copy ci-dashboard-dist
COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html

# Copy default nginx configuration
COPY ./nginx.custom.conf /etc/nginx/conf.d/default.conf
