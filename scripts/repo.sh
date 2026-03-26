#!/bin/bash

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
# Construct-X Assets Repository Bash Helpers
# 
# usage:
#       source scripts/repo.sh
#       tx-asset-tags
#       tx-asset-raw docs/Onboarding/Registration/FAQ.md
#

OWNER=eclipse-tractusx
REPO=portal-assets
BASE=https://api.github.com
BASE_RAW=https://raw.githubusercontent.com
BRANCH=main
DOC_BASE=./public/documentation

tx-asset-tags() {
    curl -s "$BASE/repos/$OWNER/$REPO/git/refs/tags"
}

tx-asset-contents() {
    curl -s "$BASE/repos/$OWNER/$REPO/contents/$1?ref=$BRANCH"
}

tx-asset-raw() {
    curl -s "$BASE_RAW/$OWNER/$REPO/$BRANCH/$1"
}

tx-asset-get-latest() {
    #git checkout main
    #git pull
    tx-asset-tags > ${DOC_BASE}/data/Releases.json
    LATEST=$(git tag | tail -1)
    echo $LATEST
}

tx-asset-checkout-tag() {
    LATEST=$(tx-asset-get-latest)
    TAG=${1:-$LATEST}
    git checkout tags/${TAG} -b tags/${TAG}
    mkdir ${DOC_BASE}/data/${TAG}
    npx directory-tree docs > ${DOC_BASE}/data/${TAG}/Tree.json
}
