docker run \
    --name trello-mango \
    --publish 27017:27017 \
    --volume `pwd`/startup-scripts:/docker-entrypoint-initdb.d \
    --detach mongo:3.4