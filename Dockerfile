FROM node:12

# set working directory
RUN mkdir /app
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# move app code
COPY dist /app/dist

# install and cache app dependencies
ADD package.json /app/
ADD package-lock.json /app/
RUN npm install

EXPOSE 3000