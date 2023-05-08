//Importing necessary dependencies
import React, { useState, useEffect } from "react";
import { TiDelete } from "react-icons/ti";
import openWeatherLogo from './openWeatherLogo.jpg';
import outingsIcon from './outingsIcon.png';
import API_KEY from './openWeather';

//Creating the Outings component
function Outings() {

  // Defining and initializing state variables using the useState hook
  // Variables for geographical location
  const [latitude, setLatitude] = useState(43.761539);
  const [longitude, setLongitude] = useState(-79.411079);
  // Variable for loading status of weather API dependent data
  const [isLoading, setIsLoading] = useState(true);
  // Variable for weather data from the weather API
  const [weatherData, setWeatherData] = useState(null);
  // Array for storing bucket list items
  const [bucketList, setBucketList] = useState([]);
  // text for new item on bucket list
  const [newItem, setNewItemText] = useState(" ");

  // Using the useEffect hook for the geolocation data
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setIsLoading(false);
        },
        (error) => console.log(error)
      );
    } else {
      console.log("Geolocation is not supported by the current browser.");
    }
  }, []);

  // Using the useEffect hook for weather data
  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => console.log(error));
  }, [latitude, longitude]);

  // Function to generate and activity suggestions based on API data
  const getActivitySuggestions = () => {
    if (!weatherData || !weatherData.weather || weatherData.weather.length === 0) {
      return null;
    }
    const temperature = weatherData.main.temp;
    const weatherConditions = weatherData.weather[0].main;
    if (temperature >= 20 && weatherConditions === 'Clear') {
      return (
        <div className="card m-3 mx-auto" style= {{width: "90%"}}>
          <div className="card-body bg-info">
            <h3 className="card-title bg-info text-light">Suggestions</h3>
            <p className="card-text text-light fs-5">It's a beautiful day! You could go for..</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">A hike</li>
            <li className="list-group-item">A walk in the park</li>
            <li className="list-group-item">A chill session at the beach</li>
            <li className="list-group-item">Fishing</li>
            <li className="list-group-item">Camping</li>
            <li className="list-group-item">A visit to the zoo</li>
          </ul>
        </div>
      );
    } else if (temperature >= 15 && weatherConditions === 'Clouds') {
      return (
        <div className="card m-3 mx-auto" style= {{width: "90%"}}>
          <div className="card-body bg-info">
            <h3 className="card-title text-light">Suggestions</h3>
            <p className="card-text text-light fs-5">It is a bit cloudy! You could..</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Ride a bike</li>
            <li className="list-group-item">Take a stroll</li>
            <li className="list-group-item">Go for a drive</li>
            <li className="list-group-item">Have brunch with family</li>
            <li className="list-group-item">Go on a shopping spree</li>
            <li className="list-group-item">Visit a museum/ art gallery</li>
            <li className="list-group-item">Go for a mini golf session</li>
            <li className="list-group-item">Visit the aquarium</li>
            <li className="list-group-item">Go for axe throwing</li>
            <li className="list-group-item">Go for an indoor rock climbing session</li>
          </ul>
        </div>
      );
    } else if (temperature >= 10 && weatherConditions === 'Rain') {
      return (
        <div className="card m-3 mx-auto" style= {{width: "90%"}}>
          <div className="card-body bg-info">
            <h3 className="card-title text-light">Suggestions</h3>
            <p className="card-text text-light fs-5">It is raining! You could..</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Go for a swim</li>
            <li className="list-group-item">Visit the library</li>
            <li className="list-group-item">Go on a coffee/ chai date</li>
            <li className="list-group-item">Watch a movie</li>
            <li className="list-group-item">Have fun at the arcade/ bowling alley</li>
            <li className="list-group-item">Go for a virtual reality session</li>
            <li className="list-group-item">Enjoy a board game seesion</li>
            <li className="list-group-item">Go bonkers at a karaoke session</li>
            <li className="list-group-item">Laugh it out at a comedy show</li>
          </ul>
        </div>
      );
    } else if (temperature >= 0 && weatherConditions === 'Snow') {
      return (
        <div className="card m-3 mx-auto" style= {{width: "90%"}}>
          <div className="card-body bg-secondary">
            <h3 className="card-title text-light">Suggestions</h3>
            <p className="card-text text-light fs-5">It is snowing! You could..</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Go for sledding</li>
            <li className="list-group-item">Swim indoors in a heated pool</li>
            <li className="list-group-item">Skate</li>
            <li className="list-group-item">Have a snowball fight</li>
            <li className="list-group-item">Netflix and Chill</li>
            <li className="list-group-item">Make a snowman</li>
            <li className="list-group-item">A board game seesion</li>
            <li className="list-group-item">Bake</li>
          </ul>
        </div>
      );
    } else {
      return (
        <div className="card m-3 mx-auto" style= {{width: "90%"}}>
          <div className="card-body bg-secondary">
            <h3 className="card-title text-light">Suggestions</h3>
            <p className="card-text text-light fs-5">Sorry, there are no activity suggestions for the current weather conditions.</p>
          </div>
        </div>
      );
    }
  };

  // Uisng the useEffect hook to load saved bucket list items from local storage when the component is mounted
  useEffect(() => {
    const storedBL = JSON.parse(localStorage.getItem("blItems")) || []; // if there is no saved item, an empty array is returned
    setBucketList(storedBL); // updating the state with saved items
  }, []);

  // Function to handle deletion of an item
  const handleItemDelete = (itemId) => {
    // using the filter method to create a new array with the clicked item removed
    const updatedBucketList = bucketList.filter((item) => item.id !== itemId);
    setBucketList(updatedBucketList); // updating the state with the new items array
    updateLocalStorage(updatedBucketList); // saving the updated items to localStorage
  };

  // Function to handle addition of a new item
  function handleAddNewItem(){
    const newBLItem = {
      id: new Date().getTime(), // generating a unique id for the new item
      text: newItem, // using the text entered in the input field for the new item's text
    };
    // using the functional form of setState to access the previous state and updating it with the new item
    setBucketList((prev) => { 
      updateLocalStorage([...prev, newBLItem]); // saving the updated items to localStorage
      return [...prev, newBLItem]; // returning the new items array with the new item added
    });
    setNewItemText(""); // clearing the input field for the new item
  }

  // Function to update the localStorage with the current bucket list
  function updateLocalStorage(itemList = bucketList) {
    // saving the current bucket list as a JSON string in localStorage
    localStorage.setItem("blItems", JSON.stringify(itemList));
  }

  // Returning the JSX for the Outings component / Rendering the Outings component
  return (
    <div className="container bg-light">
      {/* Heading and icon for the Outings component */}
      <h2 className="container-heading text-light bg-primary">Outings</h2>
      <img src={outingsIcon} alt="outings-icon" className="tab-icon"/>
       {/* Bucket List */}
      <div className="card m-3 mx-auto" style={{width: "90%"}}>
        <div className="card-body bg-warning">
          <h3 className="card-title text-light">Bucket List</h3>
          <p className="card-text text-light fs-8">Update your bucket list here..</p>
        </div>
        <ul className="list-group list-group-flush">
          {/* Mapping over the bucket list and rendering each item */}
          {bucketList.map((item) => (
            <li className="list-group-item d-flex justify-content-between">
              {item.text}
              {/* Delete icon */}
              <TiDelete size="1.5em" onClick={() => handleItemDelete(item.id)}></TiDelete>
            </li>
          ))}
            {/* Input box and add button for addition of new item to bucket list */}
            <li className="list-group-item d-flex">
              <input 
                className="new-item-inputbox form-control" 
                type="text" 
                placeholder="Add a new item..." 
                value={newItem}
                onChange={(event)=>setNewItemText(event.target.value)} 
              />
              <button type="button" onClick={handleAddNewItem} className="btn btn-lg rounded-circle m-1 btn-warning">+</button>
            </li>
        </ul>
      </div>
      {/* Location and geographical location (fetched from Open Weather API)
      based activity suggestions. Loading spinners and text displayed till
      the data is loading */}
      <div>
        {isLoading ? (
            <div>
              <h1>Loading...</h1>
              <div className="spinner-grow text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-success" role="status">
              <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-warning" role="status">
              <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-info" role="status">
              <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
          getActivitySuggestions() 
        )}
      </div>
      {/* Footer to credit Open Weather API for the location and weather data */}
      <div className="d-flex justify-content-end align-items-center small">
        <p className="m-1">Weather data provided by <a href="https://openweathermap.org/"><img src={openWeatherLogo} width="80px" alt="Open Weather" /></a></p>
      </div>
    </div>
  );
}

export default Outings;
