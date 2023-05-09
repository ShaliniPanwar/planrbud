// Importing necessary dependencies
import React, { useState, useEffect }  from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, Button } from "react-bootstrap";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import menuIcon from './menuIcon.png';

// Creating the Menu compoenent
function Menu() {

  // Defining and initializing state variables using the useState hook
  // 2-D array containing day-wise meals, 3 meals per day
  const [meals, setMeals] = useState([
    ["MONDAY", "Poha & boiled eggs", "Daal-rice & yogurt", "Daal-spinach khichri"], 
    ["TUESDAY", "Oats-chia-seed pudding", "Sambhar-dosa & chutney", "Paneer scramble & roti"],
    ["WEDNESDAY", "Egg sandwich & sprouts", "Rajma-rice & raita", "Chicken curry & roti"],
    ["THURSDAY", "Daal chilla & fruit", "Chicken curry & roti", "Veggie noodles & soup"],
    ["FRIDAY", "French toast & smoothie", "Mixed veg-roti & raita", "Egg curry & rice"],
    ["SATURDAY","Besan chilla and smoothie", "Matar paneer & roti", "Pasta & tomato soup"],
    ["SUNDAY", "Paneer paratha & sprouts", "Chole-rice & raita", "Soya pulav & soup"]
  ]);
  // Array of days
  const days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];
  // Array of background colors for day-wise menu cards
  const bgColors = ["bg-warning", "bg-success", "bg-info"];
  // Array containing breakfast options to be displayed in a modal
  const [breakfastOptions] = useState([
    "Berry yogurt bowl",
    "Oatmeal & fruit",
    "Boiled potatoes & eggs",
    "PB&J sandwich & eggs",
    "Paneer & spinach sandwich",
    "Pancakes & fruit",
    "Besan chilla and smoothie",
    "Daal chilla & fruit",
    "Oats-chia-seed pudding",
    "Paneer paratha & sprouts",
    "French toast & smoothie",
    "Egg sandwich & sprouts",
    "Poha & boiled eggs",
  ]);
  // Array containing lunch options to be displayed in a modal
  const [lunchOptions] = useState([
    "Kadhi-rice",
    "Chole-rice & raita",
    "Rajma-rice & raita",
    "Matar-paneer & roti",
    "Daal-rice & yogurt",
    "Sambhar-dosa & chutney",
    "Rajma-rice & raita",
    "Chicken curry & roti",
    "Mixed veg-roti & raita",
    "Khichri & raita",
    "Chicken pulav",
    "Egg curry & roti",
  ]);
  // Array containing dinner options to be displayed in a modal
  const [dinnerOptions] = useState([
    "Matar mushroom & roti",
    "Daal-spinach khichri",
    "Egg roll & salad",
    "Paneer scramble & roti",
    "Chicken curry & roti",
    "Veggie noodles & soup",
    "Egg curry & rice",
    "Pasta & tomato soup",
    "Soya pulav & soup",
    "Grilled chicken salad",
  ]);
  // State variables for meal modals that show options
  const [showBreakfastModal, setShowBreakfastModal] = useState(false);
  const [showLunchModal, setShowLunchModal] = useState(false);
  const [showDinnerModal, setShowDinnerModal] = useState(false);
  // To show/close modals
  const handleBreakfastModalOpen = () => setShowBreakfastModal(true);
  const handleLunchModalOpen = () => setShowLunchModal(true);
  const handleDinnerModalOpen = () => setShowDinnerModal(true);
  const handleModalClose = () => {
    setShowBreakfastModal(false);
    setShowLunchModal(false);
    setShowDinnerModal(false);
  };

  // Using the useEffect hook to load saved meals
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("meals")) || [];
    if (storedItems.length > 0) {
      setMeals(storedItems);
    } else {
      setMeals([["MONDAY", "Poha & boiled eggs", "Daal-rice & yogurt", "Daal-spinach khichri"],
        ["TUESDAY", "Oats-chia-seed pudding", "Sambhar-dosa & chutney", "Paneer scramble & roti"],
        ["WEDNESDAY", "Egg sandwich & sprouts", "Rajma-rice & raita", "Chicken curry & roti"],
        ["THURSDAY", "Daal chilla & fruit", "Chicken curry & roti", "Veggie noodles & soup"],
        ["FRIDAY", "French toast & smoothie", "Mixed veg-roti & raita", "Egg curry & rice"],
        ["SATURDAY", "Besan chilla and smoothie", "Matar paneer & roti", "Pasta & tomato soup"],
        ["SUNDAY", "Paneer paratha & sprouts", "Chole-rice & raita", "Soya pulav & soup"],
      ]);
    }
  }, []);
  
  // Function to handle editing of a meal
  const handleEditMeal = (mealToBeEdited) => {
    // to initiate prompt for user to enter the changed meal
    const newMeal = prompt("Enter the new meal:");
    if(newMeal === null){
      return;
    }
    const updatedMeals = [...meals];
    updatedMeals[mealToBeEdited]=newMeal;
    setMeals(updatedMeals); // updating the state with updated meals
    updateLocalStorage(updatedMeals); // updating the local storage with the updated meals
  };

  // Function to update localStorage with the current meals
  function updateLocalStorage(mealItems = meals) {
    // saving the current meals as a JSON string in localStorage 
    localStorage.setItem("meals", JSON.stringify(mealItems));
  };

  // // Returning the JSX for the Menu component / Rendering the Menu component
  return (
    <div className="container bg-light">
      {/* Heading and icon for the Outings component */}
      <h2 className="container-heading text-light bg-primary">Menu</h2>
      <img src={menuIcon} alt="menu-icon" className="tab-icon"/>
      {/* Meal-wise menu options displayed in modals upon clicking of buttons */}
      <div className="menu-options">
        <div className="btn btn-warning m-1 d-block" onClick={handleBreakfastModalOpen}>Breakfast Options</div>
          <Modal show={showBreakfastModal} onHide={handleModalClose}>
            <Modal.Header closeButton className="bg-warning">
              <Modal.Title>Breakfast options</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ul>
                {breakfastOptions.map((option) => (
                  <li key={option}>{option}</li>
                ))}
              </ul>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="warning" onClick={handleModalClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        <div className="btn btn-success m-1 d-block" onClick={handleLunchModalOpen}>Lunch Options</div>
            <Modal show={showLunchModal} onHide={handleModalClose}>
              <Modal.Header closeButton className="bg-success">
                  <Modal.Title className="text-light">Lunch options</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ul>
                {lunchOptions.map((option) => (
                  <li key={option}>{option}</li>
                ))}
                </ul>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="success" onClick={handleModalClose}>Close</Button>
              </Modal.Footer>
            </Modal>
          <div className="btn btn-info m-1 d-block" onClick={handleDinnerModalOpen}>Dinner Options</div>
            <Modal show={showDinnerModal} onHide={handleModalClose}>
              <Modal.Header closeButton className="bg-info">
                <Modal.Title>Dinner options</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ul>
                {dinnerOptions.map((option) => (
                  <li key={option}>{option}</li>
                ))}
                </ul>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="info" onClick={handleModalClose}>Close</Button>
              </Modal.Footer>
            </Modal>
          </div>
        {/* Menu cards - one for each day of the week */}
        <div className="menu-cards">
          {/* Mapping over days array to render day-wise cards */}
          {days.map((day, i) => (
            <div key={i} className="card bg-light mt-3 mx-auto d-block">
              <div className="card-header d-flex justify-content-between">{day}</div>
                <ul className="list-group list-group-flush">
                  {/* Mapping over background colors array to render appropriate color for each meal */}
                  {bgColors.map((bgColor, j) => (
                    <li key={j} className={`list-group-item ${bgColor} d-flex justify-content-between`}>
                    {/* Fetching meal text from meals array */}
                    {meals[i * 3 + j]}
                    {/* Edit button to facilitate editing of a meal */}
                    <FontAwesomeIcon style={{marginLeft: "10px"}} icon={faEdit} onClick={() => handleEditMeal(i * 3 + j)} />
                    </li>
                  ))}
                </ul>
            </div>
          ))}
        </div>
    </div>
);
}

export default Menu;