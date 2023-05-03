import React, { useState, useEffect } from "react";
import { TiDelete } from "react-icons/ti";
import groceryIcon from './groceryIcon.png';

function Grocery() {
  const [items, setItems] = useState([]);
  const [newGrocery, setNewGroceryText] = useState("");

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("groceryItems")) || [];
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
function handleAddNewGrocery(){
  const newItem = {
    id: new Date().getTime(),
    text: newGrocery,
    completed: false,
    quantity:1,
  };
  setItems((prev) => {
    updateLocalStorage([...prev, newItem]);
    return [...prev, newItem];
  });
  setNewGroceryText("");
}

function updateLocalStorage(itemsList = items) {
  localStorage.setItem("groceryItems", JSON.stringify(itemsList));
}
  

  const handleQuantityIncrease = (itemId) => {
    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const handleQuantityDecrease = (itemId) => {
    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: Math.max(item.quantity - 1, 1) };
      }
      return item;
    });
    setItems(updatedItems);
  };

  return (
    <div className="container bg-light">
      <h2 className="container-heading text-light bg-primary">Grocery List</h2>
      <img src={groceryIcon} alt="grocery-icon" className="tab-icon"/>
      <input 
        className="new-item-inputbox form-control" 
        type="text" 
        placeholder="Add a new item..." 
        value={newGrocery}
        onChange={(event)=>setNewGroceryText(event.target.value)} />
      <ul className="grocery-list list-group list-group-flush">
        {items.map((item) => (
          <div className="row m-2" key={item.id}>
            <li className={`list-group-item list-group-item-info d-flex align-items-center justify-content-between ${item.completed ? "bg-warning text-dark" : "bg-secondary text-light"}`}>
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => handleItemToggle(item.id)}
              />
              <button type="button" onClick={handleAddNewGrocery} className="btn btn-block btn-warning">Add</button>
              <span className="list-item">{item.text}</span>
              <div className="item-quantity">
                <button className="btn btn-sm btn-light m-2" onClick={() => {
                  const updatedItems = items.map((oldItem) => {
                    if (oldItem.id === item.id && oldItem.quantity > 1) {
                      return {...oldItem, quantity: oldItem.quantity - 1}
                    }
                    return oldItem;
                  });
                  setItems(updatedItems);
                }}>-</button>
                <span className="quantity">{item.quantity}</span>
                <button className="btn btn-sm btn-light m-2" onClick={() => {
                  const updatedItems = items.map((oldItem) => {
                    if (oldItem.id === item.id) {
                      return {...oldItem, quantity: oldItem.quantity + 1}
                    }
                    return oldItem;
                  });
                  setItems(updatedItems);
                }}>+</button>
              </div>
              <TiDelete size="1.5em" onClick={() => handleItemDelete(item.id)}></TiDelete>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Grocery;
