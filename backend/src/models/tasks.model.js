const pool = require("../db");

const getAllTasks = async () => {
    const result = await pool.query(
        "SELECT id, user_id, title, description, created_at, priority, due_date, recurrence_type, recurrence_days FROM tasks"
    )

    return result.rows;
};

module.exports = {
    getAllTasks
};