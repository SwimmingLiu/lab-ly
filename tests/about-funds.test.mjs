import assert from "node:assert/strict";
import fs from "node:fs";

const aboutPage = fs.readFileSync("pages/about.html", "utf8");
const experiences = JSON.parse(
  fs.readFileSync("collections/experiences.json", "utf8"),
);

assert.match(aboutPage, />Funds</);
assert.match(aboutPage, /role="\{experience\.description\}"/);
assert.match(aboutPage, /company="\{experience\.company\}"/);
assert.match(aboutPage, /description="\{experience\.role\}"/);

assert.equal(experiences.length, 14);
