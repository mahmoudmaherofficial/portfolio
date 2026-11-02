import { after, test } from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"

import { publicFileExists } from "./public-file.ts"

const root = fs.mkdtempSync(path.join(os.tmpdir(), "pub-root-"))
const dir = path.join(root, "public")
fs.mkdirSync(dir)
fs.writeFileSync(path.join(dir, "cv.pdf"), "")
const outsideFile = path.join(root, "secret.txt")
fs.writeFileSync(outsideFile, "")

after(() => fs.rmSync(root, { recursive: true, force: true }))

test("finds a file given a URL path with a leading slash", () => {
  assert.equal(publicFileExists("/cv.pdf", dir), true)
})

test("finds a file given a path without a leading slash", () => {
  assert.equal(publicFileExists("cv.pdf", dir), true)
})

test("returns false for a missing file", () => {
  assert.equal(publicFileExists("/missing.pdf", dir), false)
})

test("returns false for paths that escape the public dir", () => {
  assert.equal(publicFileExists("/../" + path.basename(outsideFile), dir), false)
})
