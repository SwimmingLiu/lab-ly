import assert from "node:assert/strict";
import fs from "node:fs";

const teamPage = fs.readFileSync("pages/team.html", "utf8");
const projectsPage = fs.readFileSync("pages/projects.html", "utf8");
const projectCard = fs.readFileSync("includes/project.html", "utf8");
const instructors = JSON.parse(fs.readFileSync("collections/instructors.json", "utf8"));
const currentStudents = JSON.parse(fs.readFileSync("collections/current_students.json", "utf8"));
const graduatedStudents = JSON.parse(fs.readFileSync("collections/students.json", "utf8"));

assert.match(teamPage, /email="\{instructors\.email\}"/);
assert.match(teamPage, /email="\{current_students\.email\}"/);
assert.match(teamPage, /email="\{students\.email\}"/);
assert.match(projectsPage, /email="\{instructors\.email\}"/);
assert.match(projectsPage, /email="\{students\.email\}"/);

assert.match(projectCard, /aria-label="Email"/);
assert.match(projectCard, /\{email\}/);

const expectedEmails = new Map([
  ["蒋明峰", "m.jiang@zstu.edu.cn"],
  ["李杨", "yangli@zstu.edu.cn"],
  ["张骏益", "1798860756@qq.com"],
  ["胡佳奇", "hujiaqii@foxmail.com"],
  ["范紫龙", "15370843756@163.com"],
  ["王金科", "483091634@qq.com"],
  ["洪凌云", "watchly@qq.com"],
  ["金明浩", "m15397321136@163.com"],
  ["刘永杰", "SwimmingLiu@outlook.com"],
  ["韦龙", "1410124534@qq.com"],
  ["宋方涛", "664604982@qq.com"],
  ["朱鑫淼", "1625012165@qq.com"],
  ["阮晨淼", "275997493@qq.com"],
]);

for (const person of [...instructors, ...currentStudents, ...graduatedStudents]) {
  assert.equal(person.email, expectedEmails.get(person.name), person.name);
}
