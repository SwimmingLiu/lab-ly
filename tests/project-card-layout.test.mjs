import assert from "node:assert/strict";
import fs from "node:fs";

const projectCard = fs.readFileSync("includes/project.html", "utf8");
const firstLine = projectCard.split("\n")[0];

assert.doesNotMatch(firstLine, /\bh-50\b/);
assert.match(firstLine, /\bh-auto\b/);
assert.match(firstLine, /\bmin-h-\d+\b/);
assert.match(firstLine, /\bw-full\b/);
assert.match(firstLine, /\bmax-w-64\b/);
assert.doesNotMatch(projectCard, /\bbreak-all\b/);
assert.match(projectCard, /\bwhitespace-nowrap\b/);
assert.match(projectCard, /text-\[9px\]/);
assert.match(projectCard, /text-\[15px\]/);
assert.match(projectCard, /max-w-full truncate/);

const nameIndex = projectCard.indexOf(">{name}</span>");
const emailIndex = projectCard.indexOf(">{email}</span>");
const descriptionIndex = projectCard.indexOf("{description}");

assert.ok(nameIndex < emailIndex);
assert.ok(emailIndex < descriptionIndex);
