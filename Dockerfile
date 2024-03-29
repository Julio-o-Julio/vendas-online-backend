FROM node:20.10.0 AS dev

WORKDIR /usr/src/api/

COPY package*.json ./
# COPY prisma ./prisma/

RUN npm install --quiet --no-optional --no-fund --loglevel=error

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]
