# Base image
FROM node:18-alpine3.16 AS builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY tsconfig*.json ./
COPY prisma ./prisma/

# Install app dependencies
RUN yarn install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN yarn run build

FROM node:18-alpine3.16

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Expose the port on which the app will run
EXPOSE 3000

# Start the server using the production build
CMD ["yarn", "run", "start:container"]