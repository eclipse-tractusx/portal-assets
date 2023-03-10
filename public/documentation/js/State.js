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

import { NavTools, Transformer } from './Toolkit.js'

class State {

    clazz = 'State'

    listener = {
        data: [],
        selection: [],
        menuOpen: [],
        releases: [],
        releaseSelection: [],
        search: []
    }

    data = {}
    selection = undefined
    menuOpen = true
    releases = undefined
    releaseSelection = undefined
    search = undefined
    refresh = false

    addListener(key, listener) {
        this.listener[key] = [...new Set([...this.listener[key], ...(Array.isArray(listener) ? listener : [listener])])]
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
        //console.log(this.clazz, 'setData', data)
        data.map = Transformer.tree2map({}, data, undefined, data, 0, 0)
        this.data = data
        this.fireDataChanged(data)
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

    setSelection(selection, hash) {
        if (!selection) {
            return this
        }
        if (selection.includes('#')) {
            [selection, hash] = selection.split('#')
        }
        //console.log(this.clazz, 'setSelection', selection, hash)
        selection = (this.data.map && this.data.map.hasOwnProperty(selection)) ? selection : NavTools.getRoot()
        if (selection === this.selection && !this.refresh)
            return
        this.refresh = false
        const content = this.getItem(selection)
        NavTools.pushState({ ...content, hash })
        this.selection = content.path
        this.fireSelectionChanged()
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
        this.releases = releases.map(ref => ({
            ref,
            name: ref.split('/').slice(-1)[0]
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
        this.refresh = true
        return this
    }

    addSearchListener(listener) {
        return this.addListener('search', listener)
    }

    fireSearchChanged() {
        this.listener.search.forEach(l => l.searchChanged(this.search))
        return this
    }

    setSearch(search) {
        this.search = search
        this.fireSearchChanged()
        return this
    }

}

export const state = new State()