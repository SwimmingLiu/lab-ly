import assert from "node:assert/strict";
import fs from "node:fs";

const teamPage = fs.readFileSync("pages/team.html", "utf8");
const instructors = JSON.parse(
  fs.readFileSync("collections/instructors.json", "utf8"),
);
const currentStudents = JSON.parse(
  fs.readFileSync("collections/current_students.json", "utf8"),
);
const graduatedStudents = JSON.parse(
  fs.readFileSync("collections/students.json", "utf8"),
);

assert.match(teamPage, />Current Students</);
assert.match(teamPage, />Graduated Students</);
assert.match(teamPage, /collection="current_students"/);
assert.match(teamPage, /collection="students"/);

assert.equal(instructors.length, 2);
assert.equal(currentStudents.length, 6);
assert.equal(graduatedStudents.length, 5);

assert.deepEqual(
  instructors.map(({ name, description }) => ({ name, description })),
  [
    { name: "蒋明峰", description: "医学图像处理与分析" },
    { name: "李杨", description: "模式识别与医学人工智能" },
  ],
);

const expectedCurrentStudents = [
  {
    name: "张骏益",
    description: "联邦参数高效微调",
    image: "/assets/images/avatars_students/zjy.jpg",
    url: "mailto:1798860756@qq.com",
    email: "1798860756@qq.com",
  },
  {
    name: "胡佳奇",
    description: "基于扩散模型的医学图像分割",
    image: "/assets/images/avatars_students/hjq.jpg",
    url: "mailto:hujiaqii@foxmail.com",
    email: "hujiaqii@foxmail.com",
  },
  {
    name: "范紫龙",
    description: "半监督医学图像分割",
    image: "/assets/images/avatars_students/fzl.jpg",
    url: "mailto:15370843756@163.com",
    email: "15370843756@163.com",
  },
  {
    name: "王金科",
    description: "心脏超声图像分割",
    image: "/assets/images/avatars_students/wjk.jpg",
    url: "mailto:483091634@qq.com",
    email: "483091634@qq.com",
  },
  {
    name: "洪凌云",
    description: "联邦学习与心电信号分类",
    image: "/assets/images/avatars_students/hly.jpg",
    url: "mailto:watchly@qq.com",
    email: "watchly@qq.com",
  },
  {
    name: "金明浩",
    description: "基于流匹配的跨模态医学图像合成",
    image: "/assets/images/avatars_students/jmh.jpg",
    url: "mailto:m15397321136@163.com",
    email: "m15397321136@163.com",
  },
];

const expectedGraduatedStudents = [
  {
    name: "刘永杰",
    description: "肺结节检测与分割",
    image: "/assets/images/avatars_students/lyj.jpeg",
    url: "https://swimmingliu.cn/",
    email: "SwimmingLiu@outlook.com",
  },
  {
    name: "韦龙",
    description: "心电信号分类",
    image: "/assets/images/avatars_students/wl.jpeg",
    url: "mailto:1410124534@qq.com",
    email: "1410124534@qq.com",
  },
  {
    name: "宋方涛",
    description: "联邦学习与群体学习",
    image: "/assets/images/avatars_students/sft.png",
    url: "mailto:664604982@qq.com",
    email: "664604982@qq.com",
  },
  {
    name: "朱鑫淼",
    description: "跨模态脊柱影像生成",
    image: "/assets/images/avatars_students/zxm.jpeg",
    url: "mailto:1625012165@qq.com",
    email: "1625012165@qq.com",
  },
  {
    name: "阮晨淼",
    description: "图像配准",
    image: "/assets/images/avatars_students/rcm.jpeg",
    url: "mailto:275997493@qq.com",
    email: "275997493@qq.com",
  },
];

assert.deepEqual(currentStudents, expectedCurrentStudents);
assert.deepEqual(graduatedStudents, expectedGraduatedStudents);

assert.deepEqual(
  [...graduatedStudents, ...currentStudents].map((student) => student.name),
  [
    "刘永杰",
    "韦龙",
    "宋方涛",
    "朱鑫淼",
    "阮晨淼",
    "张骏益",
    "胡佳奇",
    "范紫龙",
    "王金科",
    "洪凌云",
    "金明浩",
  ],
);
