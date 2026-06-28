import assert from "node:assert/strict";
import fs from "node:fs";

const files = [
  "README.md",
  "assets/js/main.js",
  "collections/instructors.json",
  "collections/publications.json",
  "collections/recruiment.json",
  "pages/about.html",
  "pages/index.html",
  "includes/home/card.html",
  "includes/home/cardhomepage.html",
];

const standaloneRomanizedName = /\bYang\s+Li\b/;

for (const file of files) {
  const content = fs.readFileSync(file, "utf8");

  assert.doesNotMatch(
    content,
    standaloneRomanizedName,
    `${file} should use 李杨 for standalone romanized name references`,
  );
}

const mainJs = fs.readFileSync("assets/js/main.js", "utf8");
const recruitment = fs.readFileSync("collections/recruiment.json", "utf8");

assert.doesNotMatch(mainJs, /tutor YangLi/);
assert.doesNotMatch(recruitment, /tutor YangLi/);
