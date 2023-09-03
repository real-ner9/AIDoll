
# Base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy the application files into the working directory
COPY . /app

# Install the application dependencies
# Changed "RUN npm install" to "RUN npm ci" to use npm ci instead of npm install for production builds.
# npm ci is faster and more reliable for production builds.
RUN npm ci

# Build the application
# Added a script "build" in package.json to run the build command.
# Changed "RUN npm run build" to "RUN npm run build" to execute the build script.
RUN npm run build

# Define the entry for the point container
# Added a script "start:prod" in package.json to run the application in production mode.
# Changed "RUN npm run start:prod" to "CMD npm run start:prod" to set the command to run the application.
CMD npm run start:prod

EXPOSE 3000