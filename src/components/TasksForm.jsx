import React, { useState } from "react";
import "../css/TaskForm.css";

//Component for adding tasks to the database

function TasksForm({ addTask }) {
  const [newTask, setNewTask] = useState("");
  const [newTaskCategory, setNewTaskCategory] = useState("UX");

  function handleAddTask(event) {
    event.preventDefault();
    addTask(newTask, newTaskCategory);
    setNewTask("");
    setNewTaskCategory("UX");
  }

  return (
    <div className="task-form">
      <form onSubmit={handleAddTask}>
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task"
          required
        />
        <select
          value={newTaskCategory}
          onChange={(e) => setNewTaskCategory(e.target.value)}
        >
          <option value="UX">UX</option>
          <option value="GUI">GUI</option>
          <option value="Backend">Backend</option>
        </select>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default TasksForm;
