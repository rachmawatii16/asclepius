FROM node:18-alpine

WORKDIR /app

ENV PORT 3000

ENV MODEL_URL 'https://storage.googleapis.com/ml-bucket-storage/model/model.json'

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"]