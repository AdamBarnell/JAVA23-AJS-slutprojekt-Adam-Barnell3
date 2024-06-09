import React, { useState, useEffect } from "react";
import { db } from "../utils/firebase";
import { ref, push, update, remove, onValue } from "firebase/database";
import TasksForm from "./TasksForm";
import Chatbox from "./Chatbox";
import "../css/ScrumbBoard.css";
import "../css/Login.css";
import SearchTask from "./SearchTask";

// Main component that integrates all subcomponents related to task management.

function ScrumbBoard({ currentUser, handleLogout }) {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const tasksRef = ref(db, "tasks");
    onValue(tasksRef, (snapshot) => {
      const data = snapshot.val();
      const loadedTasks = data
        ? Object.entries(data).map(([id, task]) => ({
            id,
            ...task,
          }))
        : [];
      setTasks(loadedTasks);
      setFilteredTasks(loadedTasks);
      setError("");
    });
  }, []);

  async function addTask(title, category) {
    try {
      const tasksRef = ref(db, "tasks");
      const newTaskRef = push(tasksRef);
      await update(newTaskRef, {
        title,
        status: "Todo",
        owner: "",
        category,
      });
      setError("");
    } catch (error) {
      console.error("Add task error:", error);
      setError("Something went wrong while adding a task");
    }
  }

  async function updateTask(taskId, updatedData) {
    try {
      const taskRef = ref(db, `tasks/${taskId}`);
      await update(taskRef, updatedData);
      setError("");
    } catch (error) {
      console.error("Update task error:", error);
      setError("Something went wrong while updating the task");
    }
  }

  async function deleteTask(taskId) {
    try {
      const taskRef = ref(db, `tasks/${taskId}`);
      await remove(taskRef);
      setError("");
    } catch (error) {
      console.error("Delete task error:", error);
      setError("Something went wrong while deleting the task");
    }
  }

  return (
    <div className="container">
      <h1>Scrum Board</h1>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
      <TasksForm addTask={addTask} />
      <SearchTask
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        tasks={tasks}
        setFilteredTasks={setFilteredTasks}
      />
      {error && <p className="error">{error}</p>}
      <div className="main">
        <div className="columns">
          {["Todo", "Progress", "Done"].map((status) => (
            <div key={status} className="column">
              <h2>{status}</h2>
              {filteredTasks
                .filter((task) => task.status === status)
                .map((task) => (
                  <div key={task.id} className="task">
                    <h3>{task.title}</h3>
                    {task.owner && <p>Owner: {task.owner}</p>}
                    <p>Category: {task.category}</p>
                    {status === "Todo" && (
                      <>
                        <form>
                          <input
                            type="text"
                            placeholder="Owner of task"
                            onChange={(e) => {
                              const owner = e.target.value;
                              if (owner) {
                                updateTask(task.id, { owner });
                              }
                            }}
                          />
                          <button
                            onClick={() =>
                              updateTask(task.id, { status: "Progress" })
                            }
                          >
                            Start
                          </button>
                        </form>
                      </>
                    )}
                    {status === "Progress" && (
                      <button
                        onClick={() => updateTask(task.id, { status: "Done" })}
                      >
                        Complete
                      </button>
                    )}
                    {status === "Done" && (
                      <button onClick={() => deleteTask(task.id)}>
                        Delete
                      </button>
                    )}
                  </div>
                ))}
            </div>
          ))}
        </div>
        <Chatbox currentUser={currentUser} />
      </div>
    </div>
  );
}

export default ScrumbBoard;