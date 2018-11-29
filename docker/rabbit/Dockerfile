FROM phusion/baseimage:latest

RUN apt-get update && apt-get install -y --no-install-recommends \
	curl \
	vim \
	erlang-nox \
	adduser\
 	logrotate \
 	socat \
	init-system-helpers \
	wget \
    && rm -rf /var/lib/apt/lists/*

RUN curl -o /opt/rabbit.deb http://www.rabbitmq.com/releases/rabbitmq-server/v3.6.5/rabbitmq-server_3.6.5-1_all.deb

RUN dpkg -i /opt/rabbit.deb

RUN rm /opt/rabbit.deb

RUN mkdir /etc/sv/rabbitmq

ADD run /etc/sv/rabbitmq/run

RUN chmod +x /etc/sv/rabbitmq/run

RUN ln -s /etc/sv/rabbitmq /etc/service/rabbitmq

RUN mkdir /etc/sv/rabbitmq/log

ADD log.sh /etc/sv/rabbitmq/log/run

RUN chmod 755 /etc/sv/rabbitmq/log/run

RUN mkdir -p /var/log/rabbitmq

ADD rabbit.sh /adduser.sh

RUN chmod 755 /adduser.sh

RUN chmod -R 777 /var/log/rabbitmq

CMD ["/sbin/my_init"]

