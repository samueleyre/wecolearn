FROM node:8

RUN apt-get -qq update && apt-get -qq install -y  --no-install-recommends \
      git \
      curl \
      vim \
      build-essential \
      libfontconfig1 \
    && rm -rf /var/lib/apt/lists/*


RUN curl --compressed -o- -L https://yarnpkg.com/install.sh | bash
RUN yarn global add @angular/cli


WORKDIR /src