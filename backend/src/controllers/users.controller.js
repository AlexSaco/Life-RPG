const usersModel = require("../models/users.model");

const getUsers = async (req, res) => {
    try {
        const users = await usersModel.getAllUsers();

        res.json(users);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error al obtener los usuarios"
        });
    }
};

const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const user = await usersModel.createUser(
            username,
            email,
            password
        );

        res.status(201).json(user);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error al crear el usuario"
        });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await usersModel.getUserById(id);

        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }

        res.json(user);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error al obtener el usuario"
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email } = req.body;

        const user = await usersModel.updateUser(
            id,
            username,
            email
        );

        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }

        res.json(user);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error al actualizar el usuario"
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const{id} = req.params;

        const user = await usersModel.deleteUser(id);

        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }

        res.json(user);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error al eliminar el usuario"
        });
    }

}

module.exports = {
    getUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
};