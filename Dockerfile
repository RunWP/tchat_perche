# Choose the image which has Node installed already
FROM node:latest

# Config. current working directory
WORKDIR /usr/src/app

# Copy both 'package.json' and 'package-lock.json' files
# COPY ./package*.json ./

# Install project dependencies
# RUN npm install

# Copy project files and folders to the current working directory
# COPY . .

# Config. exposed port
EXPOSE 8080

# Start server
CMD [ "node", "server.js" ]
