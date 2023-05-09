//Importing necessary dependencies
import React, { useState, useEffect } from "react";
import { TiDelete } from "react-icons/ti";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import budgetIcon from './budgetIcon.png';

//Creating the Budget component
function Budget() {
  // Defining and initializing state variables using the useState hook
  // Variable for storing the budget
  const [budget, setBudget] = useState(500);
  // Array to store expenses
  const [expenses, setExpenses] = useState([
    { id:1, name: "Grocery Shopping", cost: 180},
    { id:2, name: "Household Shopping", cost: 70},
    { id:3, name: "Savings", cost: 100},
    { id:4, name: "Food Ordering", cost: 50},
    { id:5, name: "Outings", cost: 100},
  ]);
  // Variables for storing name and cost of new expense added
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");

  // Using the useEffect hook for loading budget and expenses from local stroage
  useEffect(() => {
    const storedBudget = JSON.parse(localStorage.getItem("budget")) || 500;
    setBudget(storedBudget);
    const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || expenses;
    setExpenses(storedExpenses);
  }, [expenses]);

  // Using the UseEffect hook for setting values of total expenses, spent and remaining
  useEffect(() => {
    const totalExpenses = expenses.reduce((total, item) => {
      return (total = total + item.cost);
    }, 0);
    const spent = totalExpenses;
    const remaining = budget - totalExpenses;
    // Updating the local storage
    updateLocalStorage("totalExpenses", totalExpenses);
    updateLocalStorage("spent", spent);
    updateLocalStorage("remaining", remaining);
  }, [expenses, budget]);

  // loading values of total expenses, spent and remaining from local storage
  const totalExpenses = JSON.parse(localStorage.getItem("totalExpenses")) || 0;
  const spent = JSON.parse(localStorage.getItem("spent")) || 0;
  const remaining = JSON.parse(localStorage.getItem("remaining")) || budget;

  // setting the alert color based on whether the user is within budget
  const alertType = totalExpenses > budget ? "alert-danger" : "alert-success";

  // Function to handle editing of budget
  function handleEditBudget (){
    // prompt for user to enter new budget
    const newBudget = prompt("Enter new budget:");
    // setting the budget to new value and updating the local storage
    setBudget(newBudget);
    updateLocalStorage("budget", newBudget);
  };

  // Function to handle addition of new expense
  function handleAddNewExpense(event) {
    event.preventDefault();
    const newItem = {
      id: new Date().getTime(), // generating a unique id for the new item
      // using the text entered in the input fields for the new item's name and cost
      name: name,
      cost: Number(cost),
    };
    // using the functional form of setState to access the previous state and updating it with the new item
    setExpenses((prev) => {
      const updatedItems = [...prev, newItem]; // saving the updated items to localStorage
      updateLocalStorage("expenses", updatedItems); // returning the new items array with the new item added
      return updatedItems;
    });
    // clearing the input fields for the new item
    setName("");
    setCost("");
  };

  // Function to handle deletion of an expense
  const handleDeleteExpense = (expense) => {
    // using the filter method to create a new array with the deleted expense removed
    const updatedExpenses = expenses.filter((item) => item.id !== expense.id);
    setExpenses(updatedExpenses); // updating the expenses state with the new items array
    updateLocalStorage("expenses", updatedExpenses); // updating the local storage
  };

  // Function to update the local storage
  function updateLocalStorage(key, updatedItem) {
    // saving the current data as a JSON string in localStorage with the given key
    localStorage.setItem(key, JSON.stringify(updatedItem));
  }

   // Returning the JSX for the Budget component / Rendering the Budget component
  return (
    <div className="container bg-light">
      {/* Heading and icon for the Outings component */}
      <h2 className="container-heading text-light bg-primary">Budget</h2>
      <img src={budgetIcon} alt="budget-icon" className="tab-icon"/>
      <div className="row mt-3">
        <div className="col-sm">
          {/* Alert displaying the current total budget */}
          <div className="alert alert-secondary">
            <span>Budget: ${budget}<FontAwesomeIcon style={{marginLeft: "10px"}} icon={faEdit} onClick={handleEditBudget} /></span>
          </div>
        </div>
        <div className="col-sm">
          {/* Alert displaying the amount remaining from the total budget after taking away the current total expenses*/}
          <div className={`alert ${alertType}`}>
            <span>Remaining: ${remaining}</span>
          </div>
        </div>
        <div className="col-sm">
          {/* Alert displaying the current total amount spent */}
          <div className="alert alert-primary">
            <span>Spent: ${spent}</span>
          </div>
        </div>
      </div>
      <div className="card bg-light mt-3 mx-auto d-block">
      {/* List of all expenses as name and cost */}
      <div className="card-header d-flex justify-content-between text-light bg-success">Expenses</div>
      <ul className="list-group list-group-flush mb-2">
        {expenses.map((expense) => (
          <li className="list-group-item d-flex justify-content-between align-items-center">
            {expense.name}
            <div>
              <span className="badge bg-primary rounded-pill mr-3">
                $ {expense.cost}
              </span>
              {/* Delete icon for an expense */}
              <TiDelete size="1.5em" onClick={() => handleDeleteExpense(expense)}></TiDelete>
            </div>
          </li>
        ))}
        <li className="row m-2 align-items-center">
          {/* Form to add a new expense */}
          <form onSubmit={handleAddNewExpense} className="col">
            <div className="form-group row">
              {/* Input field to add name of new expense */}
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
              {/* Input field to add cost of new expense */}
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
              {/* Add button for new expense */}
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
