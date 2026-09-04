const pool = require("../db");

const getAllUsers = async () => {
    const result = await pool.query(
        "SELECT id, username, email, xp, level, created_at FROM users"
    );

    return result.rows;
};

const getUserById = async (id) => {
    const result = await pool.query(
        `SELECT id, username, email, xp, level, created_at
         FROM users
         WHERE id = $1`,
        [id]
    );

    return result.rows[0];
};

const updateUser = async (id, username, email) => {
    const result = await pool.query(
        `UPDATE users
         SET username = $1, email = $2
         WHERE id = $3
         RETURNING id, username, email, xp, level, created_at`,
        [username, email, id]
    );

    return result.rows[0];
};

const createUser = async (username, email, password) => {
    const result = await pool.query(
        `INSERT INTO users (username, email, password)
         VALUES ($1, $2, $3)
         RETURNING id, username, email, xp, level, created_at`,
        [username, email, password]
    );

    return result.rows[0];
};

const deleteUser = async (id) => {
    const result = await pool.query(
        `DELETE FROM users
         WHERE id = $1
         RETURNING id, username, email`,
        [id]
    );
    
    return result.rows[0];
}

module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
};

