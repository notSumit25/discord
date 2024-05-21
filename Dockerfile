FROM node:20.10.0

WORKDIR /app

COPY package* /app

RUN npm install

COPY . /app

EXPOSE 3000

CMD ["npm", "run", "dev"]