const pool = require("../db");

const getAllTasks = async () => {
    const result = await pool.query(
        "SELECT id, user_id, title, description, created_at, priority, due_date, recurrence_type, recurrence_days FROM tasks"
    )

    return result.rows;
};

const getTaskById = async (id) => {
    const result = await pool.query(
        "SELECT id, user_id, title, description, created_at, priority, due_date, recurrence_type, recurrence_days FROM tasks WHERE id = $1",
        [id]
    )

    return result.rows[0];
}

const createTask = async (task) => {
    const result = await pool.query(
        `INSERT INTO tasks (user_id, title, description, priority, due_date, recurrence_type, recurrence_days)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING id, user_id, title, description, created_at, priority, due_date, recurrence_type, recurrence_days`,
        [task.user_id, task.title, task.description, task.priority, task.due_date, task.recurrence_type, task.recurrence_days]
    );

    return result.rows[0];
}

const deleteTask = async (id) => {
    const result = await pool.query(
        `DELETE FROM tasks
         WHERE id = $1
         RETURNING title, description, priority, due_date, recurrence_type, recurrence_days`,
        [id]
    );

    return result.rows[0];
}

const updateTask = async (id, task) => {
    const result = await pool.query(
        `UPDATE tasks
         SET title = $1, description = $2, priority = $3, due_date = $4, recurrence_type = $5, recurrence_days = $6
         WHERE id = $7
         RETURNING id, user_id, title, description, created_at, priority, due_date, recurrence_type, recurrence_days`,
        [task.title, task.description, task.priority, task.due_date, task.recurrence_type, task.recurrence_days, id]
    );  

    return result.rows[0];
}


module.exports = {
    getAllTasks,
    createTask,
    deleteTask,
    getTaskById,
    updateTask
};