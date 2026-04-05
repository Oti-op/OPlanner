const express = require('express');
const router = express.Router();
const { getAllTasks, getSingleTask, createTask, updateTask, deleteTask, deleteAllTasks } = require('../controllers/task.controller');



// # get all tasks
router.get('/', getAllTasks);

// # get a single task
router.get('/:id',getSingleTask);

// #create a new task
router.post('/', createTask);

// #update a task
router.put('/:id', updateTask);

// #delete a task
router.delete('/:id', deleteTask);

// #delete all tasks
router.delete('/', deleteAllTasks);

module.exports = router