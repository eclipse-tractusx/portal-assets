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
const DEFAULT_BRANCH = 'main'

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

const createSelectLink = (item) => addEvents(
    N('a', item.name.replace(/(_|\.md$)/g, ' '), item.path === state.selection && { class: 'selected' }),
    {
        click: () => {
            state.setSelection(item.path)
        }
    }
)

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
                    this.getImage(chapter),
                    N('div', chapter.name.replace(/(_|\.md$)/g, ' '), { class: 'chapter-card-title' }),
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

    getImage(chapter) {
        return addEvents(
            N('img', null, { alt: chapter.name, src: `images/level-${chapter.level}.png` }),
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
        //console.log('chapters', data)
        clear(this.items)
        return this.items.appendChild(
            N('ul', data.children.map((chapter) => N('li', new ChapterCard(chapter))))
        )
    }

}

class ReleaseSelection extends Viewable {

    constructor() {
        super()
        state.addReleasesListener(this)
        this.view = N('div', null, { class: 'release-selection' })
    }

    createItem(item) {
        return N('option', item.name, { value: item.name, ...(item.name === state.releaseSelection ? { selected: 'selected' } : {}) })
    }

    releasesChanged(releases) {
        return this.clear().append(
            addEvents(
                N('select', releases.map(item =>
                    this.createItem(item))
                ),
                {
                    change: (e) => { state.setReleaseSelection(e.target.value) }
                }
            )
        )
    }

}


class Breadcrumb extends Viewable {

    constructor() {
        super()
        this.view = N('nav', null, { class: 'breadcrumb' })
    }

    createItem(item) {
        return N('li', createSelectLink(item))
    }

    selectionChanged(selection, content) {
        const list = [content]
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
        state.addMenuOpenListener(this)
        this.menu = N('ul', null, { class: 'level1' })
        this.toggle = this.createToggleButton()
        this.view = N('nav', [this.menu, this.toggle], { class: 'menu open' })
    }

    createToggleButton() {
        return addEvents(
            N('button'),
            {
                click: () => {
                    state.setMenuOpen(!state.menuOpen)
                }
            }
        )
    }

    createItem(item) {
        return N('li', createSelectLink(item))
    }

    createSubnav(category) {
        return N('li', [
            category.name,
            N('ul', category.children.map(this.createItem.bind(this)), { class: 'level2' })
        ])
    }

    selectionChanged(selection, content) {
        clear(this.menu)
        let start = content
        while (start.level > 1) {
            start = start.parent
        }
        [].concat(start.children
            ? start.children.map(this.createSubnav.bind(this))
            : [document.createTextNode('')]
        ).forEach(item => this.menu.appendChild(item))
        return this
    }

    menuOpenChanged(menuOpen) {
        this.view.className = `menu ${menuOpen ? 'open' : 'closed'}`
        return this
    }

}

class Content extends Viewable {

    constructor() {
        super()
        state.addMenuOpenListener(this)
        this.breadcrumb = new Breadcrumb()
        this.view = N('article', null, { class: 'content small' })
    }

    selectionChanged(selection, content) {
        return this.clear()
            .append(this.breadcrumb.selectionChanged(selection, content))
            .append(this.renderArticle(content))
        return this
    }

    menuOpenChanged(menuOpen) {
        this.view.className = menuOpen ? 'content small' : 'content large'
        return this
    }

    renderArticle(content) {
        return content.children
            ? N('ul', content.children.map((chapter) => N('li', new ChapterCard(chapter))), { class: 'subchapter' })
            : N('zero-md', null, { src: `https://raw.githubusercontent.com/catenax-ng/tx-portal-assets/${state.releaseSelection}/${content.path}` })
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
        ], { class: 'chapter' })
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
                new ReleaseSelection(),
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
        state.addReleaseSelectionListener(this)
        state.addSelectionListener(this)
        this.chapters = new Chapters()
        this.chapter = new Chapter()
        this.view = N('main', this.chapters)
        this.loadReleases()
    }

    loadReleases() {
        fetch('data/Releases.json')
            .then(response => response.json())
            .then(state.setReleases.bind(state))
    }

    releaseSelectionChanged(releaseSelection) {
        fetch(`data/${releaseSelection}/Tree.json`)
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

    static tree2map(map, tree, parent, level) {
        tree.parent = parent
        tree.level = level
        map[tree.path] = tree
        if (tree.children)
            tree.children.forEach(child => Transformer.tree2map(map, child, tree, level + 1))
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
            //console.log('path', path, item.path)
            url.searchParams.set('path', item.path)
            const title = `CX Docs - ${item.name}`
            window.history.pushState(item.path, title, url)
            document.getElementsByTagName('title')[0].firstChild.data = title
        }
    }

    static popState(e) {
        state.setSelection(e.state)
    }

}

class State {

    listener = {
        data: [],
        selection: [],
        menuOpen: [],
        releases: [],
        releaseSelection: [],
    }

    data = {}
    pendingSelection = undefined
    selection = undefined
    menuOpen = true
    releases = undefined
    releaseSelection = DEFAULT_BRANCH

    addListener(key, listener) {
        this.listener[key] = [...new Set([...this.listener[key], ...(typeof listener === 'Array' ? listener : [listener])])]
        return this
    }

    addDataListener(listener) {
        return this.addListener('data', listener)
    }

    fireDataChanged() {
        this.listener.data.forEach(l => l.dataChanged(this.data))
        return this
    }

    setData(data) {
        console.log('data', data)
        data.name = 'Home'
        data.map = Transformer.tree2map({}, data, undefined, 0)
        this.data = data
        this.fireDataChanged(data)
        this.setSelection(this.pendingSelection || this.data.path)
        return this
    }

    getItem(path) {
        return this.data.map[path]
    }

    addSelectionListener(listener) {
        this.addListener('selection', listener)
        return this
    }

    fireSelectionChanged() {
        this.listener.selection.forEach(l => l.selectionChanged(
            this.selection,
            this.data.map[this.selection]
        ))
        return this
    }

    setSelection(selection) {
        //console.log('selection', selection)
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

    addMenuOpenListener(listener) {
        return this.addListener('menuOpen', listener)
    }

    fireMenuOpenChanged() {
        this.listener.menuOpen.forEach(l => l.menuOpenChanged(this.menuOpen))
        return this
    }

    setMenuOpen(menuOpen) {
        this.menuOpen = menuOpen
        this.fireMenuOpenChanged(menuOpen)
        return this
    }

    addReleasesListener(listener) {
        return this.addListener('releases', listener)
    }

    fireReleasesChanged() {
        this.listener.releases.forEach(l => l.releasesChanged(this.releases))
        return this
    }

    setReleases(releases) {
        this.releases = [{ name: DEFAULT_BRANCH }].concat(releases.map(item => {
            item.name = item.ref.split('/').slice(-1)[0]
            return item
        }))
        this.fireReleasesChanged(this.releases)
        return this
    }

    addReleaseSelectionListener(listener) {
        return this.addListener('releaseSelection', listener)
    }

    fireReleaseSelectionChanged() {
        this.listener.releaseSelection.forEach(l => l.releaseSelectionChanged(this.releaseSelection))
        return this
    }

    setReleaseSelection(releaseSelection) {
        this.releaseSelection = releaseSelection
        this.fireReleaseSelectionChanged(releaseSelection)
        return this
    }

}

const state = new State()

window.onpopstate = NavTools.popState

window.onload = () => {
    new Page()
        .append(new Header())
        .append(new Main())
        .append(new Footer())
    state.setSelection(NavTools.currentPath())
    state.setReleaseSelection(DEFAULT_BRANCH)
}
