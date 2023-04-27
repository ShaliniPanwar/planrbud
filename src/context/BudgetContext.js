import { createContext, useReducer } from "react";

const BudgetReducer = (state, action) => {
  switch(action.type){
    case "ADD_EXPENSE": return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
    case "DELETE_EXPENSE": return {
      ...state,
      expenses: state.expenses.filter(
        (expense) => expense.id !== action.payload
      ),
    };
    case "SET_BUDGET": return {
      ...state,
      budget: action.payload,
    };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

const initialState = {
  budget: 500,
  expenses: [
    { id:1, name: "Grocery Shopping", cost: 180},
    { id:2, name: "Household Shopping", cost: 70},
    { id:3, name: "Savings", cost: 100},
    { id:4, name: "Food Ordering", cost: 50},
    { id:5, name: "Outings", cost: 100},
  ],
};

export const BudgetContext = createContext();

export const BudgetProvider = (props) => {
  const [state, dispatch] = useReducer(BudgetReducer, initialState);
  return(<BudgetContext.Provider value={{
    budget: state.budget,
    expenses: state.expenses,
    dispatch,
  }}>
    {props.children}
  </BudgetContext.Provider>)
};
