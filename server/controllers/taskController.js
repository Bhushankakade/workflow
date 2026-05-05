const Task = require('../models/Task');
const Project = require('../models/Project');

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
  const { title, description, project, assignedTo, priority, dueDate } = req.body;

  const task = await Task.create({
    title,
    description,
    project,
    assignedTo,
    priority,
    dueDate,
    activities: [{
      user: req.user._id,
      action: 'created',
      details: `Task created by ${req.user.name}`
    }]
  });

  res.status(201).json(task);
};

// @desc    Get all tasks for a project
// @route   GET /api/tasks/project/:projectId
// @access  Private
const getTasksByProject = async (req, res) => {
  const tasks = await Task.find({ project: req.params.projectId })
    .populate('assignedTo', 'name email')
    .sort({ createdAt: -1 });

  res.json(tasks);
};

// @desc    Update task status
// @route   PATCH /api/tasks/:id/status
// @access  Private
const updateTaskStatus = async (req, res) => {
  const { status } = req.body;
  const task = await Task.findById(req.params.id);

  if (task) {
    const oldStatus = task.status;
    task.status = status;
    task.activities.push({
      user: req.user._id,
      action: 'updated status',
      details: `Status changed from ${oldStatus} to ${status}`
    });

    const updatedTask = await task.save();
    res.json(updatedTask);
  } else {
    res.status(404);
    throw new Error('Task not found');
  }
};

// @desc    Add comment to task
// @route   POST /api/tasks/:id/comments
// @access  Private
const addTaskComment = async (req, res) => {
  const { text } = req.body;
  const task = await Task.findById(req.params.id);

  if (task) {
    const comment = {
      user: req.user._id,
      text
    };
    task.comments.push(comment);
    await task.save();
    res.status(201).json(task.comments);
  } else {
    res.status(404);
    throw new Error('Task not found');
  }
};

module.exports = { createTask, getTasksByProject, updateTaskStatus, addTaskComment };
