// Importing necessary dependencies
import React, { useState, useEffect }  from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, Button } from "react-bootstrap";
// import { faEdit } from "@fortawesome/free-solid-svg-icons";
import menuIcon from './menuIcon.png';

// Creating the Menu compoenent
function Menu() {

  // Defining and initializing state variables using the useState hook
  // array of objects storing day-wise meals, 3 meals per day
  const [menuCard, setMenuCard] = useState([
    { id:1, day: "MONDAY", breakfast: "Poha & boiled eggs", lunch: "Daal-rice & yogurt", dinner: "Daal-spinach khichri"},
    { id:2, day: "TUESDAY", breakfast: "Oats-chia-seed pudding", lunch: "Sambhar-dosa & chutney", dinner: "Paneer scramble & roti"},
    { id:3, day: "WEDNESDAY", breakfast: "Egg sandwich & sprouts", lunch: "Rajma-rice & raita", dinner: "Chicken curry & roti"},
    { id:4, day: "THURSDAY", breakfast: "Daal chilla & fruit", lunch: "Chicken curry & roti", dinner: "Veggie noodles & soup"},
    { id:5, day: "FRIDAY", breakfast: "French toast & smoothie", lunch: "Mixed veg-roti & raita", dinner: "Egg curry & rice"},
    { id:6, day: "SATURDAY", breakfast: "Besan chilla and smoothie", lunch: "Matar paneer & roti", dinner: "Pasta & tomato soup"},
    { id:7, day: "SUNDAY", breakfast: "Paneer paratha & sprouts", lunch: "Chole-rice & raita", dinner: "Soya pulav & soup"},
  ]);
  // Variable for storing the new edited meal
  // const [newMeal, setNewMeal] = useState("");

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
    const storedMenuCard = JSON.parse(localStorage.getItem("menuCard")) || menuCard;
    setMenuCard(storedMenuCard);
  }, [menuCard]);
  
  // Function to handle editing of a meal
  // function handleEditMeal(changedMenu, key) {
  //   setNewMeal(prompt("Enter the new meal:"));
  //   // using the functional form of setState to access the previous state and updating it with the new item
  //   setMeals((prev) => {
  //     const updatedItems = [...prev]; // saving the updated items to localStorage
  //     if(key==="breakfast"){
  //       updatedItems[changedMenu.id-1].breakfast = newMeal;
  //     }
  //     else if(key==="lunch"){
  //       updatedItems[changedMenu.id-1].lunch = newMeal;
  //     }
  //     else if(key==="dinner"){
  //       updatedItems[changedMenu.id-1].dinner = newMeal;
  //     }
  //     updateLocalStorage("meals", updatedItems); // returning the new items array with the new item added
  //     return updatedItems;
  //   });
  //   // clearing the input fields for the new item
  //   setNewMeal("");
  // };

  // Function to update localStorage with the current meals
  // function updateLocalStorage(mealItems = meals) {
  //   // saving the current meals as a JSON string in localStorage 
  //   localStorage.setItem("meals", JSON.stringify(mealItems));
  // };

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
          {menuCard.map((menu) => (
            <div className="card bg-light mt-3 mx-auto d-block">
              <div className="card-header d-flex justify-content-between">{menu.day}</div>
                <ul className="list-group list-group-flush">
                  <li className={`list-group-item bg-warning d-flex justify-content-between`}>
                    {menu.breakfast}
                    {/* <FontAwesomeIcon style={{marginLeft: "10px"}} icon={faEdit} onClick={() => handleEditMeal(menu, "breakfast")} /> */}
                  </li>
                  <li className={`list-group-item bg-success d-flex justify-content-between`}>
                    {menu.lunch}
                    {/* <FontAwesomeIcon style={{marginLeft: "10px"}} icon={faEdit} onClick={() => handleEditMeal(menu, "lunch")} /> */}
                  </li>
                  <li className={`list-group-item bg-info d-flex justify-content-between`}>
                    {menu.dinner}
                    {/* <FontAwesomeIcon style={{marginLeft: "10px"}} icon={faEdit} onClick={() => handleEditMeal(menu, "dinner")} /> */}
                  </li>
                </ul>
            </div>
          ))}
        </div>
    </div>
);
}

export default Menu;