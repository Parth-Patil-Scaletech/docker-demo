# Start off with a FROM statement to specify the base image 
# Every image has a base image that it is built on top of
# Pulls the node image from the default Docker Hub registry with 18 marking the tag (version of the image)
FROM node:18

# Set the working directory for the container
# This is the directory where everything will be executed and copied (Basically setting up a folder to work on)
WORKDIR /app

# Copy all the files from the current directory to the working directory inside the image
COPY . .

# Install the dependencies
RUN npm install

# Expose the port that the application will be running on in the container once it is up (This is needed as the container is isolated from the host machine)
EXPOSE 3000

# Command to run the application, this will start a container by executing the provided command in the image that we will build with the build command
CMD ["npm", "start"]