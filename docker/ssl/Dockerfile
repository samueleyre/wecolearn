FROM ubuntu:latest

RUN apt-get update && apt-get install -y  --no-install-recommends \
      openssl \
    && rm -rf /var/lib/apt/lists/*

ADD generate generate

RUN chmod +x generate

CMD ["/bin/bash","generate"]

#a creuser et voir si on peut monter un container data only avec compose2 et ces options 
#docker volume create --opt type=none --opt device=<host path> --opt o=bind