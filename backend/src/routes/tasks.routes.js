const express = require('express');

const {
    getTasks,
    createTask,
    deleteTask,
    getTaskById
} = require('../controllers/tasks.controller');

const router = express.Router();

router.get('/', getTasks);
router.get('/:id', getTaskById);
router.post('/', createTask);
router.delete('/:id', deleteTask);

module.exports = router;