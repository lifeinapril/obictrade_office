FROM node:14
WORKDIR /usr/src/admin
COPY ./package.json .
RUN npm install
COPY . .
EXPOSE 9000
CMD [ "npm", "start" ]