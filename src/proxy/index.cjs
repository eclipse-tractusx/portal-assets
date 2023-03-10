/********************************************************************************
 * Copyright (c) 2021, 2023 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

/*
  Main ingress controller for running the complete portal frontend on http://localhost:3000/
  A tiny reverse proxy server to forward portal frontend requests from localhost port 3000 to the
  according local web server instances. Expects these processes are running on ports 3001-3003.
*/

const { createProxyMiddleware } = require('http-proxy-middleware')

const PROXY_PORTAL = createProxyMiddleware({ target: 'http://127.0.0.1:3001', changeOrigin: true })
const PROXY_REGAPP = createProxyMiddleware({ target: 'http://127.0.0.1:3002', changeOrigin: true })
const PROXY_ASSETS = createProxyMiddleware({ target: 'http://127.0.0.1:3003', changeOrigin: true })

require('express')()
  .disable('x-powered-by')
  .use(['/assets', '/documentation'], PROXY_ASSETS)
  .use(['/registration/'], PROXY_REGAPP)
  .use(['/'], PROXY_PORTAL)
  .listen(3000)
