// Importing necessary dependencies
import React, { useState, useEffect } from "react";
import { TiDelete } from "react-icons/ti";
import todoIcon from "./todoIcon.png";

// Creating the ToDoList component
function ToDoList() {

  // Defining and initializing state variables using the useState hook
  const [items, setItems] = useState([]); // array to hold todo list items
  const [newTodo, setNewTodoText] = useState(""); // text for new todo item input field

  // Using the useEffect hook to load saved todo items from localStorage when the component is mounted
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("todoItems")) || []; // if there is no saved item, an empty array is returned
    setItems(storedItems); // updating the todo state with saved items
  }, []);

  // Function to handle toggling the completed status of a todo item
  const handleItemToggle = (itemId) => {
    // using the map method to create a new array with updated status for the clicked todo item
    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        return { ...item, completed: !item.completed }; // updating the completed status of the clicked item
      }
      return item;
    });
    setItems(updatedItems); // updating the todo state with the updated items array
    updateLocalStorage(updatedItems); // saving the updated items to localStorage
  };

  // Function to handle deleting a todo item
  const handleItemDelete = (itemId) => {
    // using the filter method to create a new array with the clicked item removed
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems(updatedItems); // updating the todo state with the new items array
    updateLocalStorage(updatedItems); // saving the updated items to localStorage
  };

  // Function to handle adding a new todo item
  function handleAddNewTodo() {
    const newItem = {
      id: new Date().getTime(), // generating a unique id for the new item
      text: newTodo, // using the text entered in the input field for the new item's text
      completed: false, // setting the initial completed status of the new item to false
    };
    // using the functional form of setState to access the previous state and updating it with the new item
    setItems((prev) => {
      updateLocalStorage([...prev, newItem]); // saving the updated items to localStorage
      return [...prev, newItem]; // returning the new items array
    });
    setNewTodoText(""); // clearing the input field for the new item
  };

  // Function to update the localStorage with the current todo list
  function updateLocalStorage(itemsList = items) {
    // saving the current todo list as a JSON string in localStorage with the key "todoItems"
    localStorage.setItem("todoItems", JSON.stringify(itemsList));
  };

  // Returning the JSX for the Todo component / Rendering the todo component
  return (
    <div className="container bg-light">
      {/* Heading and icon for the Todo component */}
      <h2 className="container-heading text-light bg-primary">To-do List</h2>
      <img src={todoIcon} alt="todo-icon" className="tab-icon" />
      {/* Input field and button to add new item */}
      <div className="new-item d-flex">
        <input
        className="new-item-inputbox form-control"
        type="text"
        placeholder="Add a new item..."
        value={newTodo}
        onChange={(event) => setNewTodoText(event.target.value)}
        />
        <button type="button" onClick={handleAddNewTodo} className="btn btn-lg rounded-circle btn-warning m-1">+</button>
      </div>
      {/* Todo List */}
      <ul className="to-do-list list-group list-group-flush">
      {/* Mapping over the todo items array and rendering each todo item */}
        {items.map((item) => (
          <div className="row m-2">
            <li
              className={`list-group-item list-group-item-info d-flex align-items-center justify-content-between ${
                item.completed ? "bg-success text-light" : "bg-info text-dark"
              }`}
              key={item.id}
            >
              {/* Checkbox for toggling item completion status */}
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => handleItemToggle(item.id)}
              />
              {/* Todo item text */}
              <span className="list-item">{item.text}</span>
              {/* Delete icon */}
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