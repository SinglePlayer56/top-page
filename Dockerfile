FROM node:18 as build
RUN docker logout
WORKDIR /opt/app
ADD package*.json ./
RUN npm i --legacy-peer-deps
ADD . .
ENV NODE_END production
RUN npm run build --production
RUN npm prune --legacy-peer-deps
CMD ["npm", "start"]
EXPOSE 3000
