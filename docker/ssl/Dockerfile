FROM ubuntu:xenial

RUN apt-get update && apt-get install -y  --no-install-recommends \
      openssl \
    && rm -rf /var/lib/apt/lists/*

ADD generate generate

RUN chmod +x generate

CMD ["/bin/bash","generate"]
