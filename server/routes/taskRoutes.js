const express = require('express');
const router = express.Router();
const { 
  createTask, 
  getTasksByProject, 
  updateTaskStatus, 
  addTaskComment 
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, createTask);

router.route('/project/:projectId')
  .get(protect, getTasksByProject);

router.route('/:id/status')
  .patch(protect, updateTaskStatus);

router.route('/:id/comments')
  .post(protect, addTaskComment);

module.exports = router;
