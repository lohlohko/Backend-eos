# Define Base Image
FROM playcourt/nodejs:16-alpine
WORKDIR /usr/src/app
USER root
COPY package*.json ./
COPY . .
RUN npm i --omit=dev && npm cache clean --force
USER user
EXPOSE 9000
CMD ["npm", "start"]
