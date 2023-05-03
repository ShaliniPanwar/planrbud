import React, { useState }  from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button } from "react-bootstrap";
import menuIcon from './menuIcon.png';

function Menu() {

  const [meals, setMeals] = useState([
    { id: 1, day: "Monday", breakfast: "Poha & boiled eggs", lunch: "Daal-rice & yogurt", dinner: "Daal-spinach khichri" },
    { id: 2, day: "Tuesday", breakfast: "Oats-chia-seed pudding", lunch: "Sambhar-dosa & chutney", dinner: "Paneer scramble & roti" },
    { id: 3, day: "Wednesday", breakfast: "Egg sandwich & sprouts", lunch: "Rajma-rice & raita", dinner: "Chicken curry & roti" },
    { id: 4, day: "Thursday", breakfast: "Daal chilla & fruit", lunch: "Chicken curry & roti", dinner: "Veggie noodles & soup" },
    { id: 5, day: "Friday", breakfast: "French toast & smoothie", lunch: "Mixed veg-roti & raita", dinner: "Egg curry & rice" },
    { id: 6, day: "Saturday", breakfast: "Besan chilla and smoothie", lunch: "Matar paneer & roti", dinner: "Pasta & tomato soup" },
    { id: 7, day: "Sunday", breakfast: "Paneer paratha & sprouts", lunch:"Chole-rice & raita", dinner:"Soya pulav & soup" },
  ]);

  const [breakfastOptions, setBreakfastOptions] = useState([
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

  const [lunchOptions, setLunchOptions] = useState([
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

  const [dinnerOptions, setDinnerOptions] = useState([
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

  const [showBreakfastModal, setShowBreakfastModal] = useState(false);
  const [showLunchModal, setShowLunchModal] = useState(false);
  const [showDinnerModal, setShowDinnerModal] = useState(false);

  const handleEditMeal = (id, changedMeal) => {
    const newMeal = prompt("Enter the new meal:");
    if(newMeal === null){
      return;
    }
    const updatedMeals = meals.map((meal) =>
      meal.id === id
        ? {
            ...meal,
            breakfast: changedMeal === "breakfast" ? newMeal : meal.breakfast,
            lunch: changedMeal === "lunch" ? newMeal : meal.lunch,
            dinner: changedMeal === "dinner" ? newMeal : meal.dinner,
          }
        : meal
    );
    setMeals(updatedMeals);
  };

  const handleBreakfastModalOpen = () => setShowBreakfastModal(true);
  const handleLunchModalOpen = () => setShowLunchModal(true);
  const handleDinnerModalOpen = () => setShowDinnerModal(true);

  const handleModalClose = () => {
    setShowBreakfastModal(false);
    setShowLunchModal(false);
    setShowDinnerModal(false);
  };


  return (
    <div className="container bg-light">
      <h2 className="container-heading text-light bg-primary">Menu</h2>
      <img src={menuIcon} alt="menu-icon" className="tab-icon"/>
      <div className="row m-2 d-flex justify-content-between align-items-center">
        <div className="col-sm-3"><div className="alert alert-secondary m-1">Click for more options!</div></div>
        <div className="col-sm-3">
          <div className="btn btn-warning m-1" onClick={handleBreakfastModalOpen}>Breakfast</div>
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
          </div>
          <div className="col-sm-3">
            <div className="btn btn-success m-1" onClick={handleLunchModalOpen}>Lunch</div>
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
            </div>
          <div className="col-sm-3">
            <div className="btn btn-info m-1" onClick={handleDinnerModalOpen}>Dinner</div>
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
          </div>
    <div className="row m-2">
      {meals.map((meal) => (
        <div className="col-sm">
            <div className="card bg-light mt-3 mx-auto" style={{width: "18rem"}}>
            <div className="card-header d-flex justify-content-between">
              {meal.day}
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item bg-warning d-flex justify-content-between">{meal.breakfast}<FontAwesomeIcon style={{marginLeft: "10px"}} icon={faEdit} onClick={() => handleEditMeal(meal.id, "breakfast")} /></li>
              <li className="list-group-item bg-success d-flex justify-content-between">{meal.lunch}<FontAwesomeIcon style={{marginLeft: "10px"}} icon={faEdit} onClick={() => handleEditMeal(meal.id, "lunch")} /></li>
              <li className="list-group-item bg-info d-flex justify-content-between">{meal.dinner}<FontAwesomeIcon style={{marginLeft: "10px"}} icon={faEdit} onClick={() => handleEditMeal(meal.id, "dinner")} /></li>
            </ul>
          </div>
        </div>
      ))}
    </div>
    </div>
);
}

export default Menu;
