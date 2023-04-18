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

copy-dist() {
    mkdir -p ./public/documentation/js/lib/$1
    cp -R ./node_modules/$1/dist/* ./public/documentation/js/lib/$1    
}

workarounds() {
    # Kubernetes ingress controllers don't deliver .mjs with correct MIME type: text/javascript
    # so we rename from .mjs to .js
    # Error in browser
    # Failed to load module script: Expected a JavaScript module script but the server responded
    # with a MIME type of "application/octet-stream". Strict MIME type checking is enforced for
    # module scripts per HTML spec.
    MM_PATH=./public/documentation/js/lib/mermaid
    cp $MM_PATH/mermaid.esm.min.mjs $MM_PATH/mermaid.esm.min.js 
    cp $MM_PATH/mermaid.esm.min.mjs.map $MM_PATH/mermaid.esm.min.js.map
}

copy-dist zero-md
copy-dist mermaid

workarounds
