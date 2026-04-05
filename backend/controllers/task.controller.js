const Task = require("../models/task.model");

// # get all tasks
const getAllTasks = async (req, res) => {
        try {
        const tasks = await Task.find({});
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// # get a single task
const getSingleTask = async (req, res) => {
        try {
        const {id} = req.params;

        const task = await Task.findById(id);
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// # create a new task
const createTask = async (req, res) => {
        try {
        const task = await Task.create(req.body);
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// # update a task
const updateTask = async (req, res) => {
        try {
        const {id} = req.params;

        const task = await Task.findByIdAndUpdate(id, req.body, {new: true});
        if (!task) {
            return res.status(404).json({message: "Task not found"});
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// # delete a task
const deleteTask = async (req, res) => {
        try{
        const { id } = req.params;

        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" })
        }

        res.status(200).json({message: "Task deleted successfully"})

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// # delete all tasks
const deleteAllTasks = async (req, res) => {
    try {
        await Task.deleteMany({});
        res.status(200).json({message: "All tasks deleted successfully"})

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    getAllTasks,
    getSingleTask,
    createTask,
    updateTask,
    deleteTask,
    deleteAllTasks
}