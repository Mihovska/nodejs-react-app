# build environment
FROM node:16.4.2-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY ./src ./src
COPY ./public ./public
RUN npm install --silent
RUN npm run build

# production environment
FROM nginx:1.21.5-alpine
COPY --from=build /app/build /var/www
COPY ./config/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]