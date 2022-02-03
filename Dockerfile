FROM node:latest AS build

ENV PHANTOM_JS="phantomjs-2.1.1-linux-x86_64"

RUN sed -i 's/ssl_conf = ssl_sect/#ssl_conf = ssl_sect/' /etc/ssl/openssl.cnf
RUN apt-get update
RUN apt-get install build-essential chrpath libssl-dev libxft-dev -y
RUN apt-get install libfreetype6 libfreetype6-dev -y
RUN apt-get install libfontconfig1 libfontconfig1-dev -y
RUN cd ~
RUN wget https://github.com/Medium/phantomjs/releases/download/v2.1.1/${PHANTOM_JS}.tar.bz2
RUN tar xvjf ${PHANTOM_JS}.tar.bz2
RUN mv ${PHANTOM_JS} /usr/local/share
RUN ln -sf /usr/local/share/${PHANTOM_JS}/bin/phantomjs /usr/local/bin
RUN phantomjs --version


WORKDIR /app
COPY package.json .
# COPY yarn.lock .
RUN yarn --non-interactive

COPY . .
RUN yarn build

CMD ["yarn", "prod"]
