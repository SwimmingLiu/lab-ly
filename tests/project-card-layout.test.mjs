import assert from "node:assert/strict";
import fs from "node:fs";

const projectCard = fs.readFileSync("includes/project.html", "utf8");
const firstLine = projectCard.split("\n")[0];

assert.doesNotMatch(firstLine, /\bh-50\b/);
assert.match(firstLine, /\bh-auto\b/);
assert.match(firstLine, /\bmin-h-\d+\b/);
assert.match(firstLine, /\bw-full\b/);
