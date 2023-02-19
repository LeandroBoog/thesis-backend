FROM node:lts-alpine

COPY . /app
WORKDIR /app

RUN npm ci && npm run build

ENTRYPOINT ["npm", "run"]
CMD ["start:prod"]
