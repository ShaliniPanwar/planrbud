import React, { useState, useEffect } from "react";
import { TiDelete } from "react-icons/ti";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import budgetIcon from './budgetIcon.png';

function Budget() {
  const [budget, setBudget] = useState(500);
  const [expenses, setExpenses] = useState([
    { id:1, name: "Grocery Shopping", cost: 180},
    { id:2, name: "Household Shopping", cost: 70},
    { id:3, name: "Savings", cost: 100},
    { id:4, name: "Food Ordering", cost: 50},
    { id:5, name: "Outings", cost: 100},
  ]);
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");

  useEffect(() => {
    const storedBudget = JSON.parse(localStorage.getItem("budget")) || 500;
    setBudget(storedBudget);
    const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || expenses;
    setExpenses(storedExpenses);
  }, [expenses]);

  useEffect(() => {
    const totalExpenses = expenses.reduce((total, item) => {
      return (total = total + item.cost);
    }, 0);
    const spent = totalExpenses;
    const remaining = budget - totalExpenses;
    updateLocalStorage("totalExpenses", totalExpenses);
    updateLocalStorage("spent", spent);
    updateLocalStorage("remaining", remaining);
  }, [expenses, budget]);

  const totalExpenses = JSON.parse(localStorage.getItem("totalExpenses")) || 0;
  const spent = JSON.parse(localStorage.getItem("spent")) || 0;
  const remaining = JSON.parse(localStorage.getItem("remaining")) || budget;

  const alertType = totalExpenses > budget ? "alert-danger" : "alert-success";

  function handleEditBudget (){
    const newBudget = prompt("Enter new budget:");
    setBudget(newBudget);
    updateLocalStorage("budget", newBudget);
  };

  function handleAddNewExpense(event) {
    event.preventDefault();
    const newItem = {
      id: new Date().getTime(),
      name: name,
      cost: Number(cost),
    };
    setExpenses((prev) => {
      const updatedItems = [...prev, newItem];
      updateLocalStorage("expenses", updatedItems);
      return updatedItems;
    });
    setName("");
    setCost("");
  };
  
  

  const handleDeleteExpense = (expense) => {
    const updatedExpenses = expenses.filter((item) => item.id !== expense.id);
    setExpenses(updatedExpenses); // updating the expenses state with the new items array
    updateLocalStorage("expenses", updatedExpenses);
  };

  function updateLocalStorage(key, updatedItem) {
    // saving the current list as a JSON string in localStorage with the given key
    localStorage.setItem(key, JSON.stringify(updatedItem));
  }

  return (
    
    <div className="container bg-light">
      <h2 className="container-heading text-light bg-primary">Budget</h2>
      <img src={budgetIcon} alt="budget-icon" className="tab-icon"/>
      <div className="row mt-3">
        <div className="col-sm">
          <div className="alert alert-secondary">
            <span>Budget: ${budget}<FontAwesomeIcon style={{marginLeft: "10px"}} icon={faEdit} onClick={handleEditBudget} /></span>
          </div>
        </div>
        <div className="col-sm">
          <div className={`alert ${alertType}`}>
            <span>Remaining: ${remaining}</span>
          </div>
        </div>
        <div className="col-sm">
          <div className="alert alert-primary">
            <span>Spent: ${spent}</span>
          </div>
        </div>
      </div>
      <div className="card bg-light mt-3 mx-auto d-block">
      <div className="card-header d-flex justify-content-between text-light bg-success">Expenses</div>
      <ul className="list-group list-group-flush mb-2">
        {expenses.map((expense) => (
          <li className="list-group-item d-flex justify-content-between align-items-center">
            {expense.name}
            <div>
              <span className="badge bg-primary rounded-pill mr-3">
                $ {expense.cost}
              </span>
              <TiDelete size="1.5em" onClick={() => handleDeleteExpense(expense)}></TiDelete>
            </div>
          </li>
        ))}
        <li className="row m-2 align-items-center">
        <form onSubmit={handleAddNewExpense} className="col">
    <div className="form-group row">
      <label htmlFor="name" className="col-sm-2 col-form-label mt-2 text-right">Name</label>
      <div className="col-sm-3 mt-2">
        <input
          required
          type="text"
          className="form-control"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <label htmlFor="cost" className="col-sm-2 mt-2 col-form-label text-right">Cost</label>
      <div className="col-sm-3 mt-2">
        <input
          required
          type="text"
          className="form-control"
          id="cost"
          value={cost}
          onChange={(event) => setCost(event.target.value)}
        />
      </div>
      <div className="col-sm-2">
        <button type="submit" className="btn rounded-circle btn-success mt-2">+</button>
      </div>
    </div>
  </form>
</li>


      </ul>
      </div>
      
    </div>
  );
}

export default Budget;
