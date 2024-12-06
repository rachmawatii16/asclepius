FROM node:18-alpine

WORKDIR /app

ENV PORT 8080

ENV MODEL_URL 'https://storage.googleapis.com/ml-bucket-storage/model/model.json'

COPY . .

RUN npm install

EXPOSE 8080

CMD ["npm", "run", "start"]