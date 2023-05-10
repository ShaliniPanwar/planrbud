import React, { useState } from "react";
import logo from './logo.png';
import ToDoList from "./ToDoList";
import Budget from "./Budget";
import Grocery from "./Grocery";
import Menu from "./Menu";
import Outings from "./Outings";
import './App.css';

function TabButton({ name, activeTab, handleTabClick }) {
  return (
    <li className="nav-item">
      <button
        className={`nav-link ${activeTab === name ? 'active' : ''}`}
        onClick={() => handleTabClick(name)}
      >
        {name}
      </button>
    </li>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState("To-do");

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
        <TabButton name="To-do" activeTab={activeTab} handleTabClick={handleTabClick} />
        <TabButton name="Budget" activeTab={activeTab} handleTabClick={handleTabClick} />
        <TabButton name="Grocery" activeTab={activeTab} handleTabClick={handleTabClick} />
        <TabButton name="Menu" activeTab={activeTab} handleTabClick={handleTabClick} />
        <TabButton name="Outings" activeTab={activeTab} handleTabClick={handleTabClick} />
      </ul>
      <div className="tab-content">
        <div className={`tab-pane fade ${activeTab === "To-do" ? 'show active' : ''}`} id="todo" role="tabpanel" aria-labelledby="todo-tab" tabindex="0">
          <ToDoList />
        </div>
        <div className={`tab-pane fade ${activeTab === "Budget" ? 'show active' : ''}`} id="budget" role="tabpanel" aria-labelledby="budget-tab" tabindex="0">
          <Budget />
        </div>
        <div className={`tab-pane fade ${activeTab === "Grocery" ? 'show active' : ''}`} id="grocery" role="tabpanel" aria-labelledby="grocery-tab" tabindex="0">
          <Grocery />
        </div>
        <div className={`tab-pane fade ${activeTab === "Menu" ? 'show active' : ''}`} id="menu" role="tabpanel" aria-labelledby="menu-tab" tabindex="0">
          <Menu />
        </div>
        <div className={`tab-pane fade ${activeTab === "Outings" ? 'show active' : ''}`} id="outings" role="tabpanel" aria-labelledby="outings-tab" tabindex="0">
          <Outings />
        </div>
      </div>
    </div>
  );
}

export default App;
