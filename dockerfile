# Stage 1: Build the front-end
FROM node:20-alpine as build-front-end

# Set the working directory for the front-end
WORKDIR /app/front-end

# Copy the package.json and package-lock.json for the front-end
COPY ./front-end/package*.json ./

# Install dependencies for the front-end
RUN npm install 

# Copy the rest of the front-end code
COPY ./front-end ./

# Build the front-end
RUN npm run build

# Stage 2: Set up the back-end
FROM node:20-alpine

# Set the working directory for the back-end
WORKDIR /app/back-end

# Copy the package.json and package-lock.json for the back-end
COPY ./back-end/package*.json ./

# Install dependencies for the back-end
RUN npm install

# Copy the rest of the back-end code
COPY ./back-end ./

# Install TypeScript globally
RUN npm install -g typescript

# Compile TypeScript files
RUN tsc

# Copy built static files from the front-end
COPY --from=build-front-end /app/front-end/dist /app/back-end/dist/public

# Expose the necessary port for the back-end
EXPOSE 3000 

# Command to start the application
CMD ["node", "./dist/main.js"]
