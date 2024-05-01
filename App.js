import React, { useState } from "react";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Not Completed");
  const [filterStatus, setFilterStatus] = useState("Both");

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "taskName") setTaskName(value);
    if (name === "description") setDescription(value);
    if (name === "status") setStatus(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTodo = {
      id: todos.length + 1,
      taskName,
      description,
      status
    };
    setTodos([...todos, newTodo]);
    setTaskName("");
    setDescription("");
    setStatus("Not Completed");
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleStatusChange = (id, newStatus) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, status: newStatus };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const filteredTodos = todos.filter(todo => {
    if (filterStatus === "Both") return true;
    return todo.status === filterStatus;
  });

  return (
    <div>
      <h1>TODO App</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Task Name:
          <input
            type="text"
            name="taskName"
            value={taskName}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={description}
            onChange={handleChange}
          />
        </label>
        <label>
          Status:
          <select name="status" value={status} onChange={handleChange}>
            <option value="Not Completed">Not Completed</option>
            <option value="Completed">Completed</option>
          </select>
        </label>
        <button type="submit">Add Todo</button>
      </form>
      <div>
        <label>
          Filter Status:
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="Both">Both</option>
            <option value="Not Completed">Not Completed</option>
            <option value="Completed">Completed</option>
          </select>
        </label>
      </div>
      <div>
        {filteredTodos.map(todo => (
          <div key={todo.id} style={{border: "1px solid black", padding: "10px", margin: "10px"}}>
            <h3>{todo.taskName}</h3>
            <p>{todo.description}</p>
            <p>Status: {todo.status}</p>
            <button onClick={() => handleStatusChange(todo.id, todo.status === "Completed" ? "Not Completed" : "Completed")}>
              Change Status
            </button>
            <button onClick={() => handleDelete(todo.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoApp;
