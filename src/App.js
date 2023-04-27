import logo from './logo.png';
import React, { useState } from "react";
import ToDoList from "./ToDoList";
import Budget from "./Budget";
import Grocery from "./Grocery";
import Menu from "./Menu";
import Outings from "./Outings";
import { BudgetProvider } from "./context/BudgetContext";
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState("todo");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="app-name">
          <h3>PLANRBUD</h3>
          <h6><i>Plan your week ahead!</i></h6>
        </div>
      </header>
      <ul className="nav nav-tabs">
          <li className="nav-item"><a className={`nav-link ${activeTab === 'to-do' ? 'active' : ''}`} onClick={() => handleTabClick('todo')}>To-Do</a></li>
          <li className="nav-item"><a className={`nav-link ${activeTab === 'budget' ? 'active' : ''}`} onClick={() => handleTabClick('budget')}>Budget</a></li>
          <li className="nav-item"><a className={`nav-link ${activeTab === 'grocery' ? 'active' : ''}`} onClick={() => handleTabClick('grocery')}>Grocery</a></li>
          <li className="nav-item"><a className={`nav-link ${activeTab === 'menu' ? 'active' : ''}`} onClick={() => handleTabClick('menu')}>Menu</a></li>
          <li className="nav-item"><a className={`nav-link ${activeTab === 'outings' ? 'active' : ''}`} onClick={() => handleTabClick('outings')}>Outings</a></li>
      </ul>
      {activeTab === "todo" && (
        <div>
          <div>
          <ToDoList />
          </div>
        </div>
      )}
      {activeTab === "budget" && (
        <BudgetProvider>
        <div>
          <div>
          <Budget />
          </div>
        </div>
        </BudgetProvider>
      )}
      {activeTab === "grocery" && (
        <div>
          <div>
          <Grocery />
          </div>
        </div>
      )}
      {activeTab === "menu" && (
        <div>
          <div>
          <Menu />
          </div>
        </div>
      )}
      {activeTab === "outings" && (
        <div>
          <div>
          <Outings />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
