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
import { Settings } from './Settings.js'

class State {

    clazz = 'State'

    listener = {
        data: [],
        selection: [],
        menuOpen: [],
        releases: [],
        releaseSelection: [],
    }

    data = {}
    selection = undefined
    menuOpen = true
    releases = undefined
    releaseSelection = undefined

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
        //console.log(this.clazz, 'setData', data)
        data.name = 'Home'
        data.map = Transformer.tree2map({}, data, undefined, 0)
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
        //console.log(this.clazz, 'setSelection', selection, hash)
        selection = (this.data.map && this.data.map.hasOwnProperty(selection)) ? selection : Settings.ROOT
        if (selection === this.selection)
            return
        const content = this.getItem(selection)
        NavTools.pushState({...content, hash})
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
        this.releases = releases.map(item => {
                item.name = item.ref.split('/').slice(-1)[0]
                return item
            })
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

export const state = new State()