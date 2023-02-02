FROM node:18-alpine
WORKDIR /opt/app
ADD package.json package.json
RUN npm install --force
ADD . .
ENV NODE_END production
RUN npm run build
RUN npm prune --production --force
CMD ["npm", "start"]
EXPOSE 3000
