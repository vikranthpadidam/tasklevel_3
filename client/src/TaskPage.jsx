/* eslint-disable no-unused-vars */
import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: null,
    priority: '',
    category: '',
  });
  const [editingTask, setEditingTask] = useState(null);
  const [skipEffect, setSkipEffect] = useState(false);


const navigate = useNavigate()

axios.defaults.withCredentials = true;
  useEffect(() => {
    fetchTasks();
  }, []);

// useEffect(()=> {
//     if(!skipEffect){
//         axios.get('http://localhost:3001/tasks')
//         .then(res => {
//             console.log("tasks: " + res.data);
//             if(res.data === "Success") {
//                  fetchTasks()
//             } else {
//                 navigate('/')
//             }
//         }).catch(err => console.log(err))
//         setSkipEffect(true)
//     }
// }, [skipEffect, navigate]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/tasks', { withCredentials: true });
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Perform any necessary formatting or conversion for the due date
      const formattedTask = {
        ...newTask,
        dueDate: newTask.dueDate.toISOString(), // Format the due date as ISO string
      };
      if (editingTask) {
        // If editingTask exists, update the task
        const response = await axios.put(`http://localhost:3001/api/tasks/${editingTask._id}`, formattedTask);
        const updatedTask = response.data;
        setTasks((prevTasks) => prevTasks.map(task => (task._id === updatedTask._id ? updatedTask : task)));
        setEditingTask(null); // Reset editingTask
      } else {

      const response = await axios.post('http://localhost:3001/api/tasks', formattedTask);
      const task = response.data;
      setTasks((prevTasks) => [...prevTasks, task]);

      }

      setNewTask({
        title: '',
        description: '',
        dueDate: null,
        priority: '',
        category: '',
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (task) => {
    setNewTask({
      title: task.title,
      description: task.description,
      dueDate: new Date(task.dueDate),
      priority: task.priority,
      category: task.category,
    });
    setEditingTask(task);
  };


  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3001/api/tasks/${taskId}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Task Manager</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            name="title"
            className="form-control"
            placeholder="Title"
            value={newTask.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="description"
            className="form-control"
            placeholder="Description"
            value={newTask.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="row mb-3">
          <div className="col-md-4">
            <DatePicker
              name="dueDate"
              className="form-control"
              placeholderText="Due Date"
              selected={newTask.dueDate}
              onChange={(date) => handleInputChange({ target: { name: 'dueDate', value: date } })}
              dateFormat="dd/MM/yyyy"
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              name="priority"
              className="form-control"
              placeholder="Priority"
              value={newTask.priority}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              name="category"
              className="form-control"
              placeholder="Category"
              value={newTask.category}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Add Task</button>
      </form>
      <ul className="list-group mt-4">
        {tasks.map((task) => (
          <li key={task._id} className="list-group-item">
            <h3>Title: {task.title}</h3>
            <p>Description: {task.description}</p>
            <p>Due Date: {task.dueDate}</p>
            <p>Priority: {task.priority}</p>
            <p>Category: {task.category}</p>
            <button className="btn btn-primary" onClick={() => handleEdit(task)}>Edit</button>
            <button className="btn btn-danger" onClick={() => handleDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskPage;
