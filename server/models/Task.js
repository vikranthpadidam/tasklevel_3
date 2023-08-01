const mongoose = require('mongoose');

// Define the schema for the Task model
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

// Create the Task model using the schema
const TaskModel = mongoose.model('Task', taskSchema);

module.exports = TaskModel;
