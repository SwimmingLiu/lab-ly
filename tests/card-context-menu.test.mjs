import assert from "node:assert/strict";
import fs from "node:fs";

const projectCard = fs.readFileSync("includes/project.html", "utf8");
const mainJs = fs.readFileSync("assets/js/main.js", "utf8");

assert.match(projectCard, /data-email="\{email\}"/);
assert.match(projectCard, /data-profile-url="\{url\}"/);

assert.match(mainJs, /initProjectCardContextMenu/);
assert.match(mainJs, /contextmenu/);
assert.match(mainJs, /复制邮箱/);
assert.match(mainJs, /访问主页/);
assert.match(mainJs, /navigator\.clipboard\.writeText/);
assert.match(mainJs, /url\.startsWith\('mailto:'\)/);
assert.match(mainJs, /url\.startsWith\('javascript:'\)/);
