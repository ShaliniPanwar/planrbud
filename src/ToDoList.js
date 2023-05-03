import React, { useState, useEffect } from "react";
import { TiDelete } from "react-icons/ti";
import todoIcon from "./todoIcon.png";

function ToDoList() {
  const [items, setItems] = useState([]);
  const [newTodo, setNewTodoText] = useState("");

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("todoItems")) || [];
    setItems(storedItems);
  }, []);

  const handleItemToggle = (itemId) => {
    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setItems(updatedItems);
    updateLocalStorage(updatedItems);
  };

  const handleItemDelete = (itemId) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems(updatedItems);
    updateLocalStorage(updatedItems);
  };

  function handleAddNewTodo() {
    const newItem = {
      id: new Date().getTime(),
      text: newTodo,
      completed: false,
    };
    setItems((prev) => {
      updateLocalStorage([...prev, newItem]);
      return [...prev, newItem];
    });
    setNewTodoText("");
  }

  function updateLocalStorage(itemsList = items) {
    localStorage.setItem("todoItems", JSON.stringify(itemsList));
  }

  return (
    <div className="container bg-light">
      <h2 className="container-heading text-light bg-primary">To-do List</h2>
      <img src={todoIcon} alt="todo-icon" className="tab-icon" />
      <input
        className="new-item-inputbox form-control"
        type="text"
        placeholder="Add a new item..."
        value={newTodo}
        onChange={(event) => setNewTodoText(event.target.value)}
      />
      <button type="button" onClick={handleAddNewTodo} className="btn btn-block btn-primary">Add</button>
      <ul className="to-do-list list-group list-group-flush">
        {items.map((item) => (
          <div className="row m-2">
            <li
              className={`list-group-item list-group-item-info d-flex align-items-center justify-content-between ${
                item.completed ? "bg-success text-light" : "bg-info text-dark"
              }`}
              key={item.id}
            >
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => handleItemToggle(item.id)}
              />
              <span className="list-item">{item.text}</span>
              <TiDelete
                size="1.5em"
                onClick={() => handleItemDelete(item.id)}
              ></TiDelete>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;