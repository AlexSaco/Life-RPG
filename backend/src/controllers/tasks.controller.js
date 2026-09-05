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

module.exports = {
    getTasks
};