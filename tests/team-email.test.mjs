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
  ["Mingfeng Jiang", "m.jiang@zstu.edu.cn"],
  ["Yang Li", "yangli@zstu.edu.cn"],
  ["JiaQi Hu", "hujiaqii@foxmail.com"],
  ["ZiLong Fan", "15370843756@163.com"],
  ["JunYi Zhang", "1798860756@qq.com"],
  ["MingHao Jin", "m15397321136@163.com"],
  ["LingYun Hong", "watchly@qq.com"],
  ["JinKe Wang", "483091634@qq.com"],
  ["Xinmiao Zhu", "1625012165@qq.com"],
  ["Fangtao Song", "664604982@qq.com"],
  ["Chenmiao Ruan", "275997493@qq.com"],
  ["Long Wei", "1410124534@qq.com"],
  ["Yongjie Liu", "SwimmingLiu@outlook.com"],
]);

for (const person of [...instructors, ...currentStudents, ...graduatedStudents]) {
  assert.equal(person.email, expectedEmails.get(person.name), person.name);
}
