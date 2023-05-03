import React, { useState, useEffect } from "react";
import { TiDelete } from "react-icons/ti";
import groceryIcon from './groceryIcon.png';

function Grocery() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("groceryItems")) || [];
    setItems(storedItems);
  }, []);

  useEffect(() => {
    localStorage.setItem("groceryItems", JSON.stringify(items));
  }, [items]);

  const handleNewItem = (event) => {
    if (event.key === "Enter") {
      const newItem = {
        id: new Date().getTime(),
        text: event.target.value,
        completed: false,
        quantity: 1, // initialize quantity to 1
      };
      setItems([...items, newItem]);
      event.target.value = "";
    }
  };

  const handleItemToggle = (itemId) => {
    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const handleItemDelete = (itemId) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems(updatedItems);
  };

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
      <input className="new-item-inputbox form-control" type="text" placeholder="Add a new item..." onKeyDown={handleNewItem} />
      <ul className="grocery-list list-group list-group-flush">
        {items.map((item) => (
          <div className="row m-2" key={item.id}>
            <li className={`list-group-item list-group-item-info d-flex align-items-center justify-content-between ${item.completed ? "bg-warning text-dark" : "bg-secondary text-light"}`}>
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => handleItemToggle(item.id)}
              />
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
