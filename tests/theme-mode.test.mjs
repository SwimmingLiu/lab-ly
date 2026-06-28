import assert from "node:assert/strict";
import fs from "node:fs";

const mainCss = fs.readFileSync("assets/css/main.css", "utf8");
const mainJs = fs.readFileSync("assets/js/main.js", "utf8");
const layout = fs.readFileSync("layouts/main.html", "utf8");
const tailwindConfig = fs.readFileSync("tailwind.config.js", "utf8");

assert.match(tailwindConfig, /darkMode:\s*['"]class['"]/);
assert.match(layout, /document\.documentElement\.classList\.add\('dark'\)/);
assert.match(mainJs, /document\.documentElement\.classList\.add\('dark'\)/);
assert.match(mainJs, /document\.documentElement\.classList\.remove\('dark'\)/);
