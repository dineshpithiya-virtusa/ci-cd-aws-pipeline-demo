FROM node:18.16.0
ENV NODE_ENV=production

COPY ["package.json","package-lock.json","./"]

RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["node","index.js"]