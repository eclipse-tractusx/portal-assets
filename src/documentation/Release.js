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

import fs from 'fs'
import dirTree from 'directory-tree'

class Transformer {

    static tree2map(map, tree, parent, level, order) {
        tree.parent = parent
        tree.level = level
        map[tree.path] = tree
        if (tree.children)
            tree.children.forEach((child, order) => Transformer.tree2map(map, child, tree, level + 1, order))
        return map
    }

}

class MDHelper {

    readContent(path) {
        if (!fs.lstatSync(path).isFile())
            return ''
        try {
          return fs.readFileSync(path, 'utf8')
        } catch (err) {
          return ''
        }
    }

    parseChapters(path) {
        return this.readContent(path).split(/\n/).filter(line => line.charAt(0)==='#')
    }

    extractChapterTree(tree) {
        if (fs.lstatSync(tree.path).isFile())
            tree.chapter = this.parseChapters(tree.path)
        else if (tree.children)
            tree.children.forEach(child => this.extractChapterTree(child))
        return tree
    }

} 

class TreeHelper {

    static readDirTree(root) {
        const tree = dirTree(root)
        //const tree = Transformer.tree2map({}, dirTree(root), undefined, 0, 0)
        return tree
    }

}

const createReleaseSelection = (version) => {

    const Settings = {
        BASE: 'https://api.github.com',
        OWNER: 'catenax-ng',
        REPO: 'tx-portal-assets',
    }

    const url = `${Settings.BASE}/repos/${Settings.OWNER}/${Settings.REPO}/git/refs/tags`

    const writeReleases = (releases) => fs.writeFileSync(
        './public/documentation/data/Releases.json',
        JSON.stringify(releases, null, 2)
    )

    const saveTags = (data) => writeReleases(
        data.map(item => item.ref)
            .concat('main')
            .reverse()
    )

    //(async () => saveLocal(await getJSON(url)))()

    if (version) {
        writeReleases(
            [version === 'main' ? version : `ref/tags/${version}`]
        )
    } else {
        fetch(url)
            .then((response) => response.json())
            .then(saveTags)
            .catch(() => writeReleases(['main']))
    }

}

const createDocsMetadata = (version) => {

    version ||= 'main'

    const DOCS = {
        docs: 'Catena-X Help Desk',
        developer: 'Catena-X Developer Documentation',
    }

    Object.entries(DOCS).forEach(item => {
        const tree = new MDHelper().extractChapterTree(
            TreeHelper.readDirTree(item[0])
        )
        tree.name = item[1]
        const path = `./public/documentation/data/${version}`
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path)
        }
        fs.writeFileSync(
            `${path}/${item[0]}.json`,
            JSON.stringify(
                tree,
                null,
                2
            )
        )
    })

}

const version = process.argv[2]
createReleaseSelection(version)
createDocsMetadata(version)