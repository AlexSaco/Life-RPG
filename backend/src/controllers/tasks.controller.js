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

const getTaskById = async (req, res) => {
    try {
        const{id} = req.params;
        const task = await tasksModel.getTaskById(id);

        if (!task){
            return res.status(404).json({
                message: "Tarea no encontrada"
            })
        }
        
        res.json(task);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error al obtener la tarea"
        });    
    }
}
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

const deleteTask = async (req, res) => {
    try{
        const {id} = req.params;
        const deletedTask = await tasksModel.deleteTask(id);

        res.status(200).json({
            message: "Tarea eliminada exitosamente",
            task: deletedTask
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error al eliminar la tarea"
        });
    }
}

module.exports = {
    getTasks,
    getTaskById,
    createTask,
    deleteTask
};