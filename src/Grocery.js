// Importing necessary dependencies
import React, { useState, useEffect } from "react";
import { TiDelete } from "react-icons/ti";
import groceryIcon from './groceryIcon.png';

// Creating the Grocery component
function Grocery() {

  // Defining and initializing state variables using the useState hook
  const [groceries, setGroceries] = useState([]); // array to hold grocery items
  const [newGrocery, setNewGroceryText] = useState(" "); // text for new grocery item input field

  // Using the useEffect hook to load saved grocery items from localStorage when the component is mounted
  useEffect(() => {
    const storedGroceries = JSON.parse(localStorage.getItem("groceryItems")) || []; // if there is no saved item, an empty array is returned
    setGroceries(storedGroceries); // updating the groceries state with saved items
  }, []);

  
  // Function to handle toggling the completed status of a grocery item
  const handleGroceryToggle = (groceryId) => {
    // using the map method to create a new array with updated status for the clicked grocery item
    const updatedGroceries = groceries.map((grocery) => { 
      if (grocery.id === groceryId) {
        return { ...grocery, completed: !grocery.completed }; // updating the completed status of the clicked item
      }
      return grocery;
    });
    setGroceries(updatedGroceries);// updating the groceries state with the updated items array
    updateLocalStorage(updatedGroceries); // saving the updated items to localStorage
  };

  // Function to handle deleting a grocery item
  const handleGroceryDelete = (groceryId) => {
    // using the filter method to create a new array with the clicked item removed
    const updatedGroceries = groceries.filter((item) => item.id !== groceryId);
    setGroceries(updatedGroceries); // updating the groceries state with the new items array
    updateLocalStorage(updatedGroceries); // saving the updated items to localStorage
  };

  // Function to handle adding a new grocery item
  function handleAddNewGrocery(){
    const newItem = {
    id: new Date().getTime(), // generating a unique id for the new item
    text: newGrocery, // using the text entered in the input field for the new item's text
    completed: false, // setting the initial completed status of the new item to false
    quantity:1, // setting the initial quantity of the new item to 1
    };
    // using the functional form of setState to access the previous state and updating it with the new item
    setGroceries((prev) => { 
      updateLocalStorage([...prev, newItem]); // saving the updated items to localStorage
      return [...prev, newItem]; // returning the new items array
    });
    setNewGroceryText(""); // clearing the input field for the new item
  }

  // Function to update the localStorage with the current groceries list
  function updateLocalStorage(groceriesList = groceries) {
    // saving the current groceries list as a JSON string in localStorage with the key "groceryItems"
    localStorage.setItem("groceryItems", JSON.stringify(groceriesList));
  }

  // Returning the JSX for the Grocery component / Rendering the Grocery component
  return (
    <div className="container bg-light">
      {/* Heading and icon for the Grocery component */}
      <h2 className="container-heading text-light bg-primary">Grocery List</h2>
      <img src={groceryIcon} alt="grocery-icon" className="tab-icon"/>
      {/* Input field and button to add new item */}
      <div className="new-item d-flex">
        <input 
        className="new-item-inputbox form-control" 
        type="text" 
        placeholder="Add a new item..." 
        value={newGrocery}
        onChange={(event)=>setNewGroceryText(event.target.value)} 
        />
        <button type="button" onClick={handleAddNewGrocery} className="btn btn-lg rounded-circle m-1 btn-info">+</button>
      </div>
      {/* Grocery List */}
      <ul className="grocery-list list-group list-group-flush">
        {/* Mapping over the groceries array and rendering each grocery item */}
        {groceries.map((grocery) => (
          <div className="row m-2" key={grocery.id}>
            <li className={`list-group-item list-group-item-info d-flex align-items-center justify-content-between ${
              grocery.completed ? "bg-warning text-dark" : "bg-secondary text-light"}`}>
              {/* Checkbox for toggling item completion status */}
              <input
                type="checkbox"
                checked={grocery.completed}
                onChange={() => handleGroceryToggle(grocery.id)}
              />
              {/* Grocery item text */}
              <span className="list-item">{grocery.text}</span>
              {/* Actions for the grocery item: quantity increase/ decrease, deletion */}
              <div className="actions d-flex align-items-center justify-content-between">
              {/* Quantity buttons */}
              <div className="item-quantity">
                <button className="btn btn-sm btn-light m-2" onClick={() => {
                  const updatedGroceries = groceries.map((oldGrocery) => {
                    if (oldGrocery.id === grocery.id && oldGrocery.quantity > 1) {
                      return {...oldGrocery, quantity: oldGrocery.quantity - 1}
                    }
                    return oldGrocery;
                  });
                  setGroceries(updatedGroceries);
                }}>-</button>
                <span className="quantity">{grocery.quantity}</span>
                <button className="btn btn-sm btn-light m-2" onClick={() => {
                  const updatedGroceries = groceries.map((oldGrocery) => {
                    if (oldGrocery.id === grocery.id) {
                      return {...oldGrocery, quantity: oldGrocery.quantity + 1}
                    }
                    return oldGrocery;
                  });
                  setGroceries(updatedGroceries);
                }}>+</button>
              </div>
              {/* Delete icon */}
              <TiDelete size="1.5em" onClick={() => handleGroceryDelete(grocery.id)}></TiDelete>
              </div>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Grocery;
