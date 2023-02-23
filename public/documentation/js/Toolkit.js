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

import { Patterns, Settings } from "./Settings.js"

const getNodeOrViewable = (c) => c.hasOwnProperty('view') ? c.view : c

const getTextNode = (c, tc) => document.createTextNode(tc === 'string' ? c : '' + c)

export const append = (n, c) => {
    if (!(c instanceof Array)) c = [c]
    for (let i in c) {
        const tc = typeof c[i]
        if (tc !== 'undefined')
            try {
                n.appendChild(
                    tc === 'object'
                        ? getNodeOrViewable(c[i])
                        : getTextNode(c[i], tc)
                )
            } catch (e) {
                const pre = document.createElement('pre')
                pre.appendChild(document.createTextNode(JSON.stringify(c[i], null, 4)))
                n.appendChild(pre)
            }
    }
    return n
}

export const N = (tag, c, att) => {
    const n = document.createElement(tag)
    if (att) for (let a of Object.keys(att)) n.setAttribute(a, att[a])
    if (typeof c === 'undefined' || c === null || c === false) return n
    return append(n, c)
}

export const remove = (n) => n.parentElement.removeChild(n)

export const clear = (n) => {
    if (!n) return
    while (n.childNodes.length > 0) n.removeChild(n.firstChild)
    return n
}

export const addEvents = (node, evts) => {
    Object.keys(evts).forEach((key) => node.addEventListener(key, evts[key]))
    return node
}

export class Viewable {

    getView() {
        return this.view
    }

    append(c) {
        append(this.getView(), c)
        //this.getView().appendChild(typeof p instanceof HTMLElement ? p : p.getView())
        return this
    }

    appendTo(p) {
        append(p, this.getView())
        //(p instanceof HTMLElement ? p : p.getView()).appendChild(this.getView())
        return this
    }

    clear() {
        clear(this.view)
        return this
    }

}

export class NavTools {

    clazz = 'NavTools'

    static currentPath() {        
        return new URL(location).searchParams.get('path')
    }

    static getRoot() {
        const path = NavTools.currentPath()
        return path ? path.split('/')[0] : Settings.DEFAULT_ROOT
    }

    static pushState(item) {
        const url = new URL(location)
        const path = url.searchParams.get('path')
        if (path !== item.path) {
            //console.log('path', path, item.path)
            url.searchParams.set('path', item.path)
            const title = `Docs - ${item.name.replace(Patterns.DISPLAY, '')}`
            const newurl =  `${location.pathname}?${url.searchParams.toString()}${item.hash ? '#'+item.hash : ''}`
            //console.log(NavTools.clazz, 'pushState', item, title, newurl)
            history.pushState(item.path, title, newurl)
            document.getElementsByTagName('title')[0].firstChild.data = title
        }
    }

}

export class Transformer {

    static tree2map(map, tree, parent, toplevel, level, order) {
        tree.parent = parent
        tree.toplevel = toplevel
        tree.level = level
        tree.order = order
        map[tree.path] = tree
        if (tree.children)
            tree.children.forEach((child, order) =>
                Transformer.tree2map(map, child, tree, level < 1 ? child : toplevel, level + 1, order))
        return map
    }

}
