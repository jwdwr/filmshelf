FROM node:12

# set working directory
RUN mkdir /app
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# move app code
COPY src /app/src
COPY config /app/config

# install and cache app dependencies
ADD package.json /app/
ADD package-lock.json /app/
RUN npm install && npm run build

EXPOSE 3000