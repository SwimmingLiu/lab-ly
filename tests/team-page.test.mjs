import assert from "node:assert/strict";
import fs from "node:fs";

const teamPage = fs.readFileSync("pages/team.html", "utf8");
const currentStudents = JSON.parse(
  fs.readFileSync("collections/current_students.json", "utf8"),
);

assert.match(teamPage, />Current Students</);
assert.match(teamPage, />Graduated Students</);
assert.match(teamPage, /collection="current_students"/);
assert.match(teamPage, /collection="students"/);

assert.equal(currentStudents.length, 6);

const expectedStudents = [
  {
    name: "JiaQi Hu",
    description: "Medical image segmentation based on diffusion models",
    image: "/assets/images/avatars_students/hjq.jpg",
    url: "mailto:hujiaqii@foxmail.com",
    email: "hujiaqii@foxmail.com",
  },
  {
    name: "ZiLong Fan",
    description: "Semi-supervised medical image segmentation",
    image: "/assets/images/avatars_students/fzl.jpg",
    url: "mailto:15370843756@163.com",
    email: "15370843756@163.com",
  },
  {
    name: "JunYi Zhang",
    description: "Federated Parameter-Efficient Fine-Tuning",
    image: "/assets/images/avatars_students/zjy.jpg",
    url: "mailto:1798860756@qq.com",
    email: "1798860756@qq.com",
  },
  {
    name: "MingHao Jin",
    description: "Flow Matching-based cross-modal medical image synthesis",
    image: "/assets/images/avatars_students/jmh.jpg",
    url: "mailto:m15397321136@163.com",
    email: "m15397321136@163.com",
  },
  {
    name: "LingYun Hong",
    description: "Federated Learning & ECG Classification",
    image: "/assets/images/avatars_students/hly.jpg",
    url: "mailto:watchly@qq.com",
    email: "watchly@qq.com",
  },
  {
    name: "JinKe Wang",
    description: "Cardiac Ultrasound Image Segmentation",
    image: "/assets/images/avatars_students/wjk.jpg",
    url: "mailto:483091634@qq.com",
    email: "483091634@qq.com",
  },
];

assert.deepEqual(currentStudents, expectedStudents);
