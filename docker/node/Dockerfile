FROM node:14.21.2

# set working directory
WORKDIR /app

# install and cache app dependencies
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock

RUN yarn
RUN yarn install
RUN npm install -g @angular/cli@14.2.10

# add app
COPY . /app
RUN yarn build

# start app
CMD ["ng", "serve", "--host", "0.0.0.0"]
