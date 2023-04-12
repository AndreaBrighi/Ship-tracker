FROM node:latest as node

WORKDIR /usr/app

COPY ./ /usr/app

RUN npm install
RUN npm run build --prod
EXPOSE 4200
#stage 2
FROM nginx:alpine
COPY --from=node /usr/app/dist/ship-tracker-frontend /usr/share/nginx/html
