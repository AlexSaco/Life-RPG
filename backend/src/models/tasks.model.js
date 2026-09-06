const pool = require("../db");

const getAllTasks = async () => {
    const result = await pool.query(
        "SELECT id, user_id, title, description, created_at, priority, due_date, recurrence_type, recurrence_days FROM tasks"
    )

    return result.rows;
};

const createTask = async (task) => {
    const result = await pool.query(
        `INSERT INTO tasks (user_id, title, description, priority, due_date, recurrence_type, recurrence_days)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING id, user_id, title, description, created_at, priority, due_date, recurrence_type, recurrence_days`,
        [task.user_id, task.title, task.description, task.priority, task.due_date, task.recurrence_type, task.recurrence_days]
    );

    return result.rows[0];
}

module.exports = {
    getAllTasks,
    createTask
};