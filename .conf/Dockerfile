#
# usage:
#       export NAME=tx-portal-assets
#       export IMAGE=ghcr.io/catenax-ng/$NAME
#       docker build -t $IMAGE -f .conf/Dockerfile .
#       docker run --rm -d -p 8080:8080 --name $NAME $IMAGE
#       docker exec $NAME find /usr/share/nginx/html/
#       docker stop $NAME
#       docker push $IMAGE
#

# Step 1
FROM alpine:latest as build-step
COPY public /public
WORKDIR /public/assets
RUN find . -type f | cut -c 3- | sort > index.txt

# Step 2
FROM nginxinc/nginx-unprivileged:alpine
COPY .conf/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-step /public/assets /usr/share/nginx/html/assets
USER 101
