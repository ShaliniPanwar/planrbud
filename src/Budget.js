import React, { useState, useContext } from "react";
import { TiDelete } from "react-icons/ti";
import { BudgetProvider } from "./context/BudgetContext";
import { BudgetContext } from "./context/BudgetContext";
import { v4 as uuidv4} from 'uuid';
import budgetIcon from './budgetIcon.png';

function Budget() {

  const { budget } = useContext(BudgetContext);
  const { expenses } = useContext(BudgetContext);
  const { dispatch } = useContext(BudgetContext);
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [newBudget, setNewBudget] = useState(budget);

  const totalExpenses = expenses.reduce((total, item) => {
    return (total = total + item.cost);
  }, 0);

  const alertType = totalExpenses > newBudget ? "alert-danger" : "alert-success";

  const onSubmit = (event) => {
    event.preventDefault();
    const expense = {
      id: uuidv4(),
      name: name,
      cost: parseInt(cost),
    };
    dispatch({
      type: 'ADD_EXPENSE',
      payload: expense,
    });
    setName('');
    setCost('');
  };

  const handleDeleteExpense = (expense) => {
    dispatch({
      type: "DELETE_EXPENSE",
      payload: expense.id,
    });
  };

  const handleReset = () => {
  dispatch({ type: "RESET" });
  };

  return (
    <BudgetProvider>
    <div className="container bg-light">
      <h2 className="container-heading text-light bg-primary">Budget</h2>
      <img src={budgetIcon} alt="budget-icon" className="tab-icon"/>
      <div className="row mt-3">
      <div className="col-sm">
        <div className="alert alert-warning">
          <span>
            <label htmlFor="newBudget">Edit Budget:</label>
            <input type="number" id="newBudget" className = "m-2" value={newBudget} onChange={e => setNewBudget(e.target.value)} />
            <button type="submit" className="btn btn-warning btn-sm" onClick={() => dispatch({type: 'SET_BUDGET', payload: newBudget})}>Set Budget</button>
          </span>
        </div>
      </div>
      <div className="col-sm">
        <div className="alert alert-warning">
          <span>
            <button className="btn btn-warning" onClick={handleReset}>Reset for a new week</button>
          </span>
        </div>
      </div>
      </div>
      <div className="row mt-3">
        <div className="col-sm">
          <div className="alert alert-secondary">
            <span>Budget: CAD {budget}</span>
          </div>
        </div>
        <div className="col-sm">
          <div className={`alert ${alertType}`}>
            <span>Remaining: CAD {budget-totalExpenses}</span>
          </div>
        </div>
        <div className="col-sm">
          <div className="alert alert-primary">
            <span>Spent: CAD {totalExpenses}</span>
          </div>
        </div>
      </div>
      <h3>Expenses</h3>
      <ul className="list-group mb-2">
        {expenses.map((expense) => (
          <li className="list-group-item d-flex justify-content-between align-items-center">
            {expense.name}
            <div>
              <span className="badge bg-primary rounded-pill mr-3">
                CAD{expense.cost}
              </span>
              <TiDelete size="1.5em" onClick={() => handleDeleteExpense(expense)}></TiDelete>
            </div>
          </li>
        ))}
      </ul>
      <h5>Add Expense</h5>
      <div className="mt-3">
        <div className="col-sm">
          <form onSubmit={onSubmit}>
            <div className="row">
              <div className="col-sm">
                <label for="name">Name</label>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}>
                </input>
              </div>
              <div className="col-sm">
                <label for="cost">Cost</label>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="cost"
                  value={cost}
                  onChange={(event) => setCost(event.target.value)}>
                </input>
              </div>
              <div className="col-sm">
                <button type="submit" className="btn btn-primary mt-4">Add</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    </BudgetProvider>
  );
}

export default Budget;
