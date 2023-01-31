#!/bin/bash
#
# Catena-X Assets Repository Bash Helpers
# 
# usage:
#       source scripts/repo.sh
#       tx-asset-tags
#       tx-asset-raw docs/Onboarding/Registration/FAQ.md
#

OWNER=catenax-ng
REPO=tx-portal-assets
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
