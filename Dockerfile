FROM node:18-slim as BUILDER

WORKDIR /usr/task-api/

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy specifics folders to workdir
COPY src ./src
COPY .sequelizerc ./
COPY .env ./
COPY entrypoint.sh ./

# Create final container and install bash
FROM node:18-alpine
RUN apk add bash

WORKDIR /usr/task-api/

# Copy all folders from builder container and add execute permition to entry point
COPY --from=BUILDER /usr/task-api/ ./

RUN chmod +x entrypoint.sh

# Finish Build Container
EXPOSE 3000

ENTRYPOINT ["./entrypoint.sh"]
CMD ["npm", "start"]