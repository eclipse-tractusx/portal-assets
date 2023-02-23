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

import http from 'http'
import https from 'https'

/**
 * checkProxy - check if the given URL needs to go through corporate proxy set as https_proxy
 * 
 * @param {*} url parsed url
 * @returns proxy settings or falsy if not applicable
 */

export const checkProxy = (url) => process.env.https_proxy
    && (!process.env.no_proxy?.split(/[, ]+/).find(domain => url.hostname.endsWith(domain)))
    && ((token) =>
        token.length < 4
            ? {
                protocol: token[0],
                host: token[1],
                port: token[2],
            }
            : {
                protocol: token[0],
                auth: `${token[1]}:${token[2]}`,
                host: token[3],
                port: token[4],
            }
    )(
        process.env.https_proxy.split(/[:/@]+/)
    )


/**
 * get - read data from https URL, detect proxy settings from env vars
 * 
 * Note: currently doesn't work with multiple proxies (like cntlm)
 * 
 * @param {*} urlString url as string
 * @param {*} options currently only supports headers attribute
 * @returns promise to fulfil the https request
 */

export async function get(urlString, options) {

    const url = new URL(urlString)

    return new Promise((resolve, reject) => {

        const readData = (response) => {
            const chunks = []
            response.on('error', (err) => reject(err))
            response.on('data', (chunk) => chunks.push(chunk))
            response.on('end', () => resolve({
                body: Buffer.concat(chunks).toString(),
                headers: response.headers,
                status: response.statusCode
            }))
            response.setTimeout(15000, () => reject('Timeout'))
        }
        const headers = { ...(options?.headers || {}), 'user-agent': 'nodejs' }
        const proxy = checkProxy(url)

        if (proxy) {
            if (proxy.auth) {
                headers['proxy-authorization'] = 'Basic ' + Buffer.from(proxy.auth).toString('base64')
            }
            http.request({
                host: proxy.host,
                port: proxy.port,
                method: 'CONNECT',
                path: `${url.hostname}:${url.port || 443}`,
                headers
            }).on('connect', (res, socket) => {
                delete headers['proxy-authorization']
                if (res.statusCode === 200) {
                    const agent = new https.Agent({ socket })
                    https.get({
                        host: url.hostname,
                        path: url.pathname,
                        agent,
                        headers: headers
                    }, readData)
                        .on('error', (err) => reject(err.message))
                } else {
                    reject('Could not connect to proxy!')
                }
            })
                .on('error', (err) => reject(err.message))
                .end()
        } else {
            https.get(url, readData)
        }
    })

}

export const getJSON = async (urlString, options) =>
    JSON.parse((await get(urlString, options)).body)
