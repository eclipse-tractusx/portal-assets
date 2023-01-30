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

tx-asset-tags() {
    curl -s "$BASE/repos/$OWNER/$REPO/git/refs/tags"
}

tx-asset-contents() {
    curl -s "$BASE/repos/$OWNER/$REPO/contents/$1?ref=$BRANCH"
}

tx-asset-raw() {
    curl -s "$BASE_RAW/$OWNER/$REPO/$BRANCH/$1"
}
