const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const protect = require('../middleware/auth');

// All routes below are protected (need JWT token)

// ─── @route   GET /api/tasks ───────────────────────────
// ─── @desc    Get all tasks for logged in user ─────────
// ─── @access  Private ─────────────────────────────────
router.get('/', protect, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ─── @route   POST /api/tasks ──────────────────────────
// ─── @desc    Create a new task ────────────────────────
// ─── @access  Private ─────────────────────────────────
router.post('/', protect, async (req, res) => {
  try {
    const { title, description, stage, priority } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Task title is required' });
    }

    const task = await Task.create({
      user: req.user._id,
      title,
      description,
      stage: stage || 'Todo',
      priority: priority || 'Medium',
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ─── @route   PUT /api/tasks/:id ──────────────────────
// ─── @desc    Update a task ────────────────────────────
// ─── @access  Private ─────────────────────────────────
router.put('/:id', protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Make sure the task belongs to the logged in user
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: 'after', runValidators: true }
    );

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ─── @route   DELETE /api/tasks/:id ───────────────────
// ─── @desc    Delete a task ────────────────────────────
// ─── @access  Private ─────────────────────────────────
router.delete('/:id', protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Make sure the task belongs to the logged in user
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await task.deleteOne();

    res.json({ message: 'Task deleted successfully', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;