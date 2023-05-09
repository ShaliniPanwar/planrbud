//Importing necessary dependencies
import React, { useState } from "react";
import logo from './logo.png';
import ToDoList from "./ToDoList";
import Budget from "./Budget";
import Grocery from "./Grocery";
import Menu from "./Menu";
import Outings from "./Outings";
import './App.css';

//Creating the App component
function App() {

  // Defining and initializing active tab state variable using the useState hook
  const [activeTab, setActiveTab] = useState("todo"); // todo tab set as default

  // Function to set the active tab
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  // Returning the JSX for the App component / Rendering the App component
  return (
    <div className="App">
      <header className="App-header">
        {/* App Header containing the App logo, name and tag line */}
        <img src={logo} className="App-logo" alt="logo" />
        <div className="app-name">
          <h3>PLANRBUD</h3>
          <h6><i>Plan your week ahead!</i></h6>
        </div>
      </header>
      {/* Navigation bar with the 5 components of the app - to-do, budget, grocery, menu and outings */}
      <ul className="nav nav-tabs">
        <li className="nav-item"><button className={`nav-link ${activeTab === 'to-do' ? 'active' : ''}`} onClick={() => handleTabClick('todo')}>To-Do</button></li>
        <li className="nav-item"><button className={`nav-link ${activeTab === 'budget' ? 'active' : ''}`} onClick={() => handleTabClick('budget')}>Budget</button></li>
        <li className="nav-item"><button className={`nav-link ${activeTab === 'grocery' ? 'active' : ''}`} onClick={() => handleTabClick('grocery')}>Grocery</button></li>
        <li className="nav-item"><button className={`nav-link ${activeTab === 'menu' ? 'active' : ''}`} onClick={() => handleTabClick('menu')}>Menu</button></li>
        <li className="nav-item"><button className={`nav-link ${activeTab === 'outings' ? 'active' : ''}`} onClick={() => handleTabClick('outings')}>Outings</button></li> 
      </ul>
      {/* Conditional rendering of a specific component based on the tab clicked */}
      {activeTab === "todo" && (
        <div>
          <div>
          <ToDoList />
          </div>
        </div>
      )}
      {activeTab === "budget" && (
        <div>
          <div>
          <Budget />
          </div>
        </div>
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
