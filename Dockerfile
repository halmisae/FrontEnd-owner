# React app 빌드
FROM node:16 AS build

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

 COPY . ./
 RUN npm run build

 # nginx 실행
 FROM nginx:alpine

 COPY --from=build /app/build /usr/share/nginx/html

 EXPOSE 80

 CMD ["nginx", "-g", "daemon off;"]
