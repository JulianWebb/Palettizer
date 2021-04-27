FROM node:14-alpine

ENV NODE_APP=production

WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production
COPY . .

CMD ["npm", "start"]