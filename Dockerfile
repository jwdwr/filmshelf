FROM node:12

# set working directory
RUN mkdir /usr/src/app && \
    mkdir /usr/src/app/logs
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# move app code
COPY dist /usr/src/app/dist

# install and cache app dependencies
ADD package.json /usr/src/app/
ADD package-lock.json /usr/src/app/
RUN npm install && npm run build

# development stuff
ADD src /usr/src/app/src
ADD nodemon.json /usr/src/app/
ADD tsconfig.json /usr/src/app/
RUN npm run dev

EXPOSE 3000