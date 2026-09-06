const tasksModel = require("../models/tasks.model");

const getTasks = async (req, res) => {
    try{
        const tasks = await tasksModel.getAllTasks();

        res.json(tasks);
    }catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error al obtener las tareas"
        });
    }
};

const createTask = async (req, res) => {
    try{
        const task = req.body;
        const newTask = await tasksModel.createTask(task);

        res.status(201).json({
            message: "Tarea creada exitosamente",
            task: newTask
        });
    }catch (error) {
        console.error(error);

        res.status(500).json({
            message:"Error al crear la tarea"
        });
    }
}

module.exports = {
    getTasks,
    createTask
};