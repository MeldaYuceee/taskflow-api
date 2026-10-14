const express = require("express");
const requestLogger = require("./middlewares/logger");
const taskRouter = require("./routes/taskRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(requestLogger);

app.get("/", (req, res) => {
    res.send({ status: "online", system: "TaskFlow Core API" });
});

app.use("/tasks", taskRouter);

app.listen(PORT, () => {
    console.log(`TaskFlow servisi ${PORT} portunda aktif.`);
});
