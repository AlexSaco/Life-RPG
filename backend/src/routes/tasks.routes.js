const express = require('express');

const {
    getTasks,
    createTask,
    deleteTask,
    getTaskById,
    updateTask
} = require('../controllers/tasks.controller');

const router = express.Router();

router.get('/', getTasks);
router.get('/:id', getTaskById);
router.post('/', createTask);
router.delete('/:id', deleteTask);
router.put('/:id', updateTask);

module.exports = router;