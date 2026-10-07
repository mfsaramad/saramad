const fs = require("fs");
const path = "src/data/db.json";
const db = JSON.parse(fs.readFileSync(path, "utf-8"));

const before = db.instructors.length;

// حذف استاد مریم رضایی (id: 4)
db.instructors = db.instructors.filter(i => i.id !== "4");

fs.writeFileSync(path, JSON.stringify(db, null, 2), "utf-8");

console.log("OK: استاد حذف شد");
console.log("اساتید:", before, "->", db.instructors.length);
console.log("باقی‌مانده:", db.instructors.map(i => i.name).join(", "));
