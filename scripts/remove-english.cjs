const fs = require("fs");
const path = "src/data/db.json";
const db = JSON.parse(fs.readFileSync(path, "utf-8"));

const before = {
  courses: db.courses.length,
  exams: db.exams.length,
  live: db.liveClasses.length,
  testimonials: db.testimonials.length,
};

db.courses = db.courses.filter(c => c.slug !== "english-conversation");
db.exams = db.exams.filter(e => e.slug !== "english-level-test");
db.liveClasses = db.liveClasses.filter(l => l.slug !== "english-conversation-qa");
db.testimonials = db.testimonials.filter(t => !t.course.includes("مکالمه انگلیسی"));

fs.writeFileSync(path, JSON.stringify(db, null, 2), "utf-8");

console.log("✅ حذف شد!");
console.log("📊 دوره‌ها:", before.courses, "→", db.courses.length);
console.log("📝 آزمون‌ها:", before.exams, "→", db.exams.length);
console.log("🎥 کلاس زنده:", before.live, "→", db.liveClasses.length);
console.log("💬 نظرات:", before.testimonials, "→", db.testimonials.length);
