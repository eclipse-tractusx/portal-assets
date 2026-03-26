/********************************************************************************
 * Copyright (c) 2022 Contributors to the Eclipse Foundation
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

class MDHelper {
  readContent(path) {
    try {
      const fd = fs.openSync(path, 'r')
      if (!fs.lstatSync(fd).isFile()) {
        return ''
      }
      return fs.existsSync(fd) ? fs.readFileSync(fd, 'utf8') : ''
    } catch (err) {
      return ''
    }
  }

  parseChapters(path) {
    return this.readContent(path)
      .split(/\n/)
      .filter((line) => line.charAt(0) === '#')
  }

  extractChapterTree(tree) {
    if (fs.lstatSync(tree.path).isFile())
      tree.chapter = this.parseChapters(tree.path)
    else if (tree.children) {
      tree.children.forEach((child) => this.extractChapterTree(child))
    }
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
  const writeReleases = (releases) =>
    fs.writeFileSync(
      './public/documentation/data/Releases.json',
      JSON.stringify(releases, null, 2)
    )

  writeReleases([
    version !== undefined && version !== 'main'
      ? `ref/tags/${version}`
      : 'main',
  ])
}

const createDocsMetadata = (version) => {
  version ||= 'main'

  const DOCS = {
    admin: 'Construct-X Admin Documentation',
    api: 'Construct-X API Documentation',
    architecture: 'Construct-X Architecture Documentation',
    developer: 'Construct-X Developer Documentation',
    user: 'Construct-X Help Desk',
  }

  Object.entries(DOCS).forEach((item) => {
    process.chdir('./docs')
    const tree = new MDHelper().extractChapterTree(
      TreeHelper.readDirTree(item[0])
    )
    process.chdir('..')
    tree.name = item[1]
    const path = `./public/documentation/data/${version}`
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path)
    }
    fs.writeFileSync(`${path}/${item[0]}.json`, JSON.stringify(tree, null, 2))
  })
}

const version = process.argv[2]
createReleaseSelection(version)
createDocsMetadata(version)
