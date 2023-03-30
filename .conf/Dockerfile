###############################################################
# Copyright (c) 2021, 2023 Contributors to the Eclipse Foundation
#
# See the NOTICE file(s) distributed with this work for additional
# information regarding copyright ownership.
#
# This program and the accompanying materials are made available under the
# terms of the Apache License, Version 2.0 which is available at
# https://www.apache.org/licenses/LICENSE-2.0.
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
# WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
# License for the specific language governing permissions and limitations
# under the License.
#
# SPDX-License-Identifier: Apache-2.0
###############################################################

#
# usage:
#       export NAME=tx-portal-assets
#       export IMAGE=ghcr.io/catenax-ng/$NAME
#       docker build -t $IMAGE -f .conf/Dockerfile .
#       docker run --rm -d -p 3000:8080 --name $NAME $IMAGE
#       docker exec $NAME find /usr/share/nginx/html/
#       docker stop $NAME
#       docker push $IMAGE
#

# Step 1
FROM alpine:3.17 as build-step
COPY public /public
WORKDIR /public/assets
RUN find . -type f | cut -c 3- | sort > index.txt
WORKDIR /public/documentation
RUN find . -type f | cut -c 3- | sort > index.txt

# Step 2
FROM nginxinc/nginx-unprivileged:alpine
# temp fix for CVE-2023-23916 and CVE-2023-0464
USER root
RUN apk upgrade --no-cache curl libcurl libssl3 libcrypto3
COPY .conf/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-step /public/assets /usr/share/nginx/html/assets
COPY --from=build-step /public/documentation /usr/share/nginx/html/documentation
USER 101
