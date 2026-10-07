const fs = require("fs");
const path = "src/data/db.json";
const db = JSON.parse(fs.readFileSync(path, "utf-8"));

const before = db.skillCategories.length;

// حذف دسته‌بندی language
db.skillCategories = db.skillCategories.filter(s => s.id !== "language");

fs.writeFileSync(path, JSON.stringify(db, null, 2), "utf-8");

console.log("OK: حذف شد");
console.log("دسته‌بندی‌ها:", before, "→", db.skillCategories.length);
