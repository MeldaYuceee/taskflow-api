const fs = require("fs");
const path = require("path");

const dbPath = path.resolve(__dirname, "../data/tasks.json");

function getTaskList() {
    try {
        if (!fs.existsSync(dbPath)) {
            fs.writeFileSync(dbPath, "[]", "utf-8");
            return [];
        }
        const content = fs.readFileSync(dbPath, "utf-8");
        return JSON.parse(content || "[]");
    } catch (err) {
        console.error("Veri okuma hatasi:", err.message);
        return [];
    }
}

function saveTaskList(items) {
    try {
        fs.writeFileSync(dbPath, JSON.stringify(items, null, 2), "utf-8");
        return true;
    } catch (err) {
        console.error("Veri kayit hatasi:", err.message);
        return false;
    }
}

module.exports = { getTaskList, saveTaskList };
