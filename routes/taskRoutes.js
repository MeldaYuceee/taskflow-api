const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { getTaskList, saveTaskList } = require("../helpers/storage");

const router = express.Router();

// Tum gorevleri getir (GET /tasks)
router.get("/", (req, res) => {
    const taskList = getTaskList();
    return res.status(200).json({
        success: true,
        total: taskList.length,
        items: taskList
    });
});

// Tekil gorev sorgula (GET /tasks/:id)
router.get("/:id", (req, res) => {
    const { id } = req.params;
    const taskList = getTaskList();
    const found = taskList.find(t => t.id === id);

    if (!found) {
        return res.status(404).json({
            success: false,
            message: "Ilgili IDye sahip gorev kaydi bulunamadi."
        });
    }

    return res.status(200).json({
        success: true,
        data: found
    });
});

// Yeni gorev kaydi olustur (POST /tasks)
router.post("/", (req, res) => {
    const { title, description, priority, assignee } = req.body;

    if (!title || !assignee) {
        return res.status(400).json({
            success: false,
            message: "Eksik alan: title ve assignee zorunludur."
        });
    }

    const taskList = getTaskList();
    const newTask = {
        id: uuidv4(),
        title: title.trim(),
        description: description ? description.trim() : "",
        priority: priority || "orta",
        assignee: assignee.trim(),
        completed: false,
        createdAt: new Date().toISOString()
    };

    taskList.push(newTask);
    saveTaskList(taskList);

    return res.status(201).json({
        success: true,
        message: "Gorev basariyla eklendi.",
        data: newTask
    });
});

// Gorev guncelle (PUT /tasks/:id)
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const taskList = getTaskList();
    const targetIndex = taskList.findIndex(t => t.id === id);

    if (targetIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Guncellenecek gorev bulunamadi."
        });
    }

    const current = taskList[targetIndex];
    const { title, description, priority, assignee, completed } = req.body;

    taskList[targetIndex] = {
        ...current,
        title: title !== undefined ? title.trim() : current.title,
        description: description !== undefined ? description.trim() : current.description,
        priority: priority || current.priority,
        assignee: assignee !== undefined ? assignee.trim() : current.assignee,
        completed: typeof completed === "boolean" ? completed : current.completed,
        updatedAt: new Date().toISOString()
    };

    saveTaskList(taskList);

    return res.status(200).json({
        success: true,
        message: "Gorev guncellendi.",
        data: taskList[targetIndex]
    });
});

// Gorev sil (DELETE /tasks/:id)
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const taskList = getTaskList();
    const initialCount = taskList.length;

    const filtered = taskList.filter(t => t.id !== id);

    if (filtered.length === initialCount) {
        return res.status(404).json({
            success: false,
            message: "Silinmek istenen gorev listede yok."
        });
    }

    saveTaskList(filtered);

    return res.status(200).json({
        success: true,
        message: "Gorev silindi."
    });
});

module.exports = router;
