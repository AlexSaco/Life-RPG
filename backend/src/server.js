const express = require("express");
const pool = require("./db");
const usersRoutes = require("./routes/users.routes");
const tasksRoutes = require("./routes/tasks.routes");

const app = express();
app.use(express.json());

app.use("/api/users", usersRoutes);
app.use("/api/tasks", tasksRoutes);

const PORT = 3000;

app.get("/", (req, res) => {
    res.json({
        message: "LIFE RPG 🎮"
    });
});

app.get("/db-test", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");

        res.json({
            message: "Database connected!",
            time: result.rows[0].now
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Database connection failed"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Life RPG API running on port ${PORT}`);
});