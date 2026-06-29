import assert from "node:assert/strict";
import fs from "node:fs";

const projectCard = fs.readFileSync("includes/project.html", "utf8");
const mainJs = fs.readFileSync("assets/js/main.js", "utf8");

assert.match(projectCard, /data-email="\{email\}"/);
assert.doesNotMatch(projectCard, /data-profile-url="\{url\}"/);
assert.doesNotMatch(projectCard, /^<a href="\{url\}"/);
assert.match(projectCard, /data-copy-email="\{email\}"/);
assert.match(projectCard, /data-i18n="context\.visitHomepage"/);
assert.match(projectCard, /data-i18n="context\.copyEmail"/);
assert.match(projectCard, /href="\{url\}"/);
assert.match(projectCard, /type="button"/);

assert.doesNotMatch(mainJs, /initProjectCardContextMenu/);
assert.doesNotMatch(mainJs, /contextmenu/);
assert.doesNotMatch(mainJs, /projectCardContextMenu/);
assert.match(mainJs, /initCopyEmailButtons/);
assert.match(mainJs, /data-copy-email/);
assert.match(mainJs, /getTranslation\('context\.copyEmail'\)/);
assert.match(mainJs, /getTranslation\('context\.emailCopied'\)/);
assert.match(mainJs, /'context.copyEmail': 'Copy email'/);
assert.match(mainJs, /'context.copyEmail': '复制邮箱'/);
assert.match(mainJs, /'context.visitHomepage': 'Visit homepage'/);
assert.match(mainJs, /'context.visitHomepage': '访问主页'/);
assert.match(mainJs, /'context.emailCopied': 'Copied'/);
assert.match(mainJs, /'context.emailCopied': '已复制'/);
assert.match(mainJs, /navigator\.clipboard\.writeText/);
