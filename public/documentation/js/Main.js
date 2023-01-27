/********************************************************************************
 * Copyright (c) 2021-2023 Contributors to the Eclipse Foundation
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

const ROOT = 'docs'

const append = (n, c) => {
    if (!(c instanceof Array)) c = [c]
    for (let i in c) {
        const tc = typeof c[i]
        if (tc !== 'undefined')
            try {
                n.appendChild(
                    tc === 'object'
                        ? (c[i].hasOwnProperty('view') ? c[i].view : c[i])
                        : document.createTextNode(tc === 'string' ? c[i] : '' + c[i])
                )
            } catch (e) {
                const pre = document.createElement('pre')
                pre.appendChild(document.createTextNode(JSON.stringify(c[i], null, 4)))
                n.appendChild(pre)
            }
    }
    return n
}

const N = (tag, c, att) => {
    const n = document.createElement(tag)
    if (att) for (let a of Object.keys(att)) n.setAttribute(a, att[a])
    if (typeof c === 'undefined' || c === null || c === false) return n
    return append(n, c)
}

const remove = (n) => n.parentElement.removeChild(n)

const clear = (n) => {
    if (!n) return
    while (n.childNodes.length > 0) n.removeChild(n.firstChild)
    return n
}

const addEvents = (node, evts) => {
    Object.keys(evts).forEach((key) => node.addEventListener(key, evts[key]))
    return node
}

function debounce(func, timeout = 220) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => func.apply(this, args), timeout)
    }
}

const processChange = debounce((e) => Selector.filter(e))

class Viewable {

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

class SearchInput extends Viewable {

    constructor(providers) {
        super()
        this.input = addEvents(
            N('input', null, {
                type: 'search',
                class: 'search',
                placeholder: 'Enter your company name',
                value: getSelectedIDP(providers),
            }),
            {
                keyup: (e) => processChange(e.target.value),
                search: (e) => processChange(e.target.value),
            }
        )
        this.view = N('div', this.input, { class: 'search-container' })
        this.view.firstChild.select()
    }

    focus() {
        this.input.focus()
        return this
    }

}

class ChapterCard extends Viewable {

    constructor(chapter) {
        super()
        this.view = addEvents(
            N('div',
                N('div', [
                    this.getImage(chapter.name),
                    N('div', chapter.name, { class: 'chapter-card-title' }),
                ], {
                    href: chapter.path
                }),
                { class: 'chapter-card' }
            ),
            {
                click: (e) => {
                    state.setSelection(chapter.path)
                }
            }
        )
    }

    getImage(name) {
        return addEvents(
            N('img', null, { alt: name, src: `images/lib.png`}),
            {
                error: (e) => { e.target.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' }
            }
        )
    }

}

class Chapters extends Viewable {

    constructor() {
        super()
        state.addDataListener(this)
        this.items = N('div')
        this.view = N('section', [
            N('h1', 'Portal Documentation'),
            this.items
        ], { class: 'chapters' })
    }

    dataChanged(data) {
        console.log('chapters', data)
        this.items.appendChild(
            N('ul', data.children.map((chapter) => N('li', new ChapterCard(chapter))))
        )
    }

}

class Breadcrumb extends Viewable {

    constructor() {
        super()
        this.view = N('nav', null, { class: 'breadcrumb' })
    }

    createItem(item) {
        return N('li', 
            addEvents(
                N('a', item.name),
                {
                    click: () => {
                        state.setSelection(item.path)
                    }
                }
            )
        )
    }

    selectionChanged(selection, content) {
        const list = [ content ]
        while (list[0].parent) {
            list.unshift(list[0].parent)
        }
        return this.clear().append(
            N('ul', list.map(item => this.createItem(item)))
        )
    }

}

class Navigation extends Viewable {

    constructor() {
        super()
        this.view = N('nav', null, { class: 'navigation' })
    }

    createItem(item) {
        return N('li', 
            addEvents(
                N('a', item.name),
                {
                    click: () => {
                        state.setSelection(item.path)
                    }
                }
            )
        )
    }

    selectionChanged(selection, content) {
        return this.clear().append(
            N('ul',
                [
                    this.createItem({ path: ROOT }),
                    this.createItem(content)
                ].concat(content.children
                    ? content.children.map((child) => this.createItem(child))
                    : ['']
                )
            )
        )
    }

}

class Content extends Viewable {

    constructor() {
        super()
        this.breadcrumb = new Breadcrumb()
        this.view = N('article', null, { class: 'content' })
    }

    selectionChanged(selection, content) {        
        return this.clear()
            .append(this.breadcrumb.selectionChanged(selection, content))
            .append(this.renderArticle(content))
    }

    renderArticle(content) {
        return content.children
            ? ''
            : N('zero-md', null, { src: `https://raw.githubusercontent.com/catenax-ng/tx-portal-assets/main/${content.path}` })
    }

}

class Chapter extends Viewable {

    constructor() {
        super()
        this.navigation = new Navigation()
        this.content = new Content()
        this.view = N('section', [
            this.navigation,
            this.content
        ],  { class: 'chapter' })
    }

    selectionChanged(selection, content) {
        this.navigation.selectionChanged(selection, content)
        this.content.selectionChanged(selection, content)
        return this
    }

}

class Page extends Viewable {
    constructor() {
        super()
        this.view = document.body
        while (this.view.childNodes.length > 0)
            this.view.removeChild(this.view.lastChild)
    }
}

class Header extends Viewable {
    constructor() {
        super()
        this.view = N(
            'header',
            [
                N('div', null, { class: 'logo' }),
            ]
        )
    }
}

class Footer extends Viewable {
    constructor() {
        super()
        this.view = N('footer', [
            N('div', '', { class: 'links' }),
            N('div', 'Copyright © Catena-X Automotive Network.', { class: 'copy' })
        ])
    }
}

class Main extends Viewable {

    constructor() {
        super()
        state.addSelectionListener(this)
        this.chapters = new Chapters()
        this.chapter = new Chapter()
        this.view = N('main', this.chapters)
        this.loadData()
    }

    loadData() {
        fetch('data/Tree.js')
            .then(response => response.json())
            .then(state.setData.bind(state))
    }

    selectionChanged(selection, content) {
        return this.clear().append(selection === ROOT
            ? this.chapters
            : this.chapter.selectionChanged(selection, content)
        )
    }

}

class Transformer {

    static tree2map(map, tree, parent) {
        tree.parent = parent
        map[tree.path] = tree
        if (tree.children)
            tree.children.forEach(child => Transformer.tree2map(map, child, tree))
        return map
    }

}

class NavTools {

    static currentPath() {
        const url = new URL(window.location)
        return url.searchParams.get('path')
    }

    static pushState(item) {
        const url = new URL(window.location)
        const path = url.searchParams.get('path')
        if (path !== item.path) {
            console.log('path', path, item.path)
            url.searchParams.set('path', item.path)
            const title = `CX Docs - ${item.name}`
            window.history.pushState({}, title, url)
            document.getElementsByTagName('title')[0].firstChild.data = title
        }
    }

}

class State {

    data = {}
    dataListener = []
    pendingSelection = undefined
    selection = undefined
    selectionListener = []

    addDataListener(listener) {
        this.dataListener = [...new Set([...this.dataListener, ...(typeof listener === 'Array' ? listener : [listener])])]
        return this
    }

    fireDataChanged() {
        this.dataListener.forEach(l => l.dataChanged(this.data))
        return this
    }

    setData(data) {
        console.log('data', data)
        data.name = 'Home'
        data.map = Transformer.tree2map({}, data)
        this.data = data
        this.fireDataChanged(data)
        this.setSelection(this.pendingSelection || this.data.path)
        return this
    }

    getItem(path) {
        return this.data.map[path]
    }

    addSelectionListener(listener) {
        this.selectionListener = [...new Set([...this.selectionListener, ...(typeof listener === 'Array' ? listener : [listener])])]
        return this
    }

    fireSelectionChanged() {
        this.selectionListener.forEach(l => l.selectionChanged(
            this.selection,
            this.data.map[this.selection]
        ))
        return this
    }

    setSelection(selection) {
        console.log('selection', selection)
        if (selection === this.selection)
            return
        if (!this.data.map) {
            this.pendingSelection = selection
            return
        }
        const content = this.getItem(selection)
        if (!content) {
            console.warn(`invalid selection`, selection)
            return
        }
        NavTools.pushState(content)
        this.selection = content.path
        this.fireSelectionChanged()
        this.pendingSelection = undefined
        return this
    }

}

const state = new State()

window.onload = () => {
    new Page()
        .append(new Header())
        .append(new Main())
        .append(new Footer())
    state.setSelection(NavTools.currentPath())
}
