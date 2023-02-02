FROM node:18-alpine
WORKDIR /opt/app
ADD package.json package.json
RUN npm install -g npm@9.4.1
RUN npm install --legacy-peer-deps
ADD . .
ENV NODE_END production
RUN npm run build
RUN npm prune --omit=dev --legacy-peer-deps
CMD ["npm", "start"]
EXPOSE 3000
