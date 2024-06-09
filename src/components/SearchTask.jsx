import React from "react";
import "../css/SearchTask.css";

// Component for searching and filtering tasks based on category or task title.

function SearchTask({ searchQuery, setSearchQuery, tasks, setFilteredTasks }) {
  function handleSearch(event) {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    filterTasks(query);
  }

  function filterTasks(query) {
    const filtered = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(query) ||
        task.category.toLowerCase().includes(query)
    );
    setFilteredTasks(filtered);
  }

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search tasks"
        value={searchQuery}
        onChange={handleSearch}
      />
    </div>
  );
}

export default SearchTask;
