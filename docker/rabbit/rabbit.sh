#!/bin/bash
up=`sv status rabbit`
if ! [[ "${up}" =~ ^(run: rabbit) ]]; then
    rabbitmqctl add_user user password
	rabbitmqctl add_vhost vhost
	rabbitmqctl set_permissions -p vhost user ".*" ".*" ".*"
fi


