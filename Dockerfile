FROM node:14
WORKDIR /obictrade_office
COPY ./package.json .
RUN npm install
COPY . .
EXPOSE 9000
CMD [ "npm", "start" ]