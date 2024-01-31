#!/bin/bash

###############################################################
# Copyright (c) 2023 Contributors to the Eclipse Foundation
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

print-usage() {
  cat << EOF
#
# Generate license files for all images in folder and subfolders
#
# usage:
#       source ./scripts/license.sh
#       cd path/to/your/images
#       license-images
#
EOF
}

license-images() {
  for file in $(find . -type f \( -name '*.png' -o -name '*.jpg' -o -name '*.svg' \));
  do
    echo $file
    cat << EOF > $file.license
This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: Copyright (c) 2024 Contributors to the Eclipse Foundation
- Source URL: https://github.com/eclipse-tractusx/portal-assets

EOF
  done
}

print-usage
