FROM ubuntu:latest

RUN apt-get update && apt-get install -y --no-install-recommends \
      memcached \
      runit 


#service

RUN mkdir -p /etc/sv/memcached
ADD run/memcached /etc/sv/memcached/run
RUN chmod +x /etc/sv/memcached/run
RUN ln -s /etc/sv/memcached /etc/service/memcached


#launch command

CMD ["/usr/bin/runsvdir","-P", "/etc/service"]