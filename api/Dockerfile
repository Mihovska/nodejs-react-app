FROM node:16.4.2
# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

# Copy app source code
COPY ./src ./

# Install app dependencies
RUN npm ci --silent && npm prune --production

#Expose port and start application
EXPOSE 8080

CMD [ "npm", "start" ]