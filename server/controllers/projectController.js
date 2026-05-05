const Project = require('../models/Project');
const User = require('../models/User');

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private (Admin/Manager)
const createProject = async (req, res) => {
  const { title, description, team } = req.body;

  const project = await Project.create({
    title,
    description,
    team: team || [req.user._id],
    creator: req.user._id
  });

  const populatedProject = await Project.findById(project._id)
    .populate('creator', 'name email')
    .populate('team', 'name email');

  res.status(201).json(populatedProject);
};

// @desc    Get all projects for a user
// @route   GET /api/projects
// @access  Private
const getProjects = async (req, res) => {
  const projects = await Project.find({
    $or: [
      { creator: req.user._id },
      { team: req.user._id }
    ]
  }).populate('creator', 'name email').populate('team', 'name email');

  res.json(projects);
};

// @desc    Get project by ID
// @route   GET /api/projects/:id
// @access  Private
const getProjectById = async (req, res) => {
  const project = await Project.findById(req.params.id)
    .populate('creator', 'name email')
    .populate('team', 'name email');

  if (project) {
    res.json(project);
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private (Admin/Manager)
const updateProject = async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (project) {
    project.title = req.body.title || project.title;
    project.description = req.body.description || project.description;
    project.team = req.body.team || project.team;

    const updatedProject = await project.save();
    const populatedProject = await Project.findById(updatedProject._id)
      .populate('creator', 'name email')
      .populate('team', 'name email');
    res.json(populatedProject);
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private (Admin/Manager)
const deleteProject = async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (project) {
    await project.deleteOne();
    res.json({ message: 'Project removed' });
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
};

module.exports = { createProject, getProjects, getProjectById, updateProject, deleteProject };
