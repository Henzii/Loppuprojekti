FROM node:14-alpine

WORKDIR /usr/src/risbeegomfkerho

COPY . .

RUN npm ci --only-production
RUN npm run build

CMD npm start
