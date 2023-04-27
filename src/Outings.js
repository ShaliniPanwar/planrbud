import React, { useState, useEffect } from "react";

function Outings() {
  const [latitude, setLatitude] = useState(43.761539);
  const [longitude, setLongitude] = useState(-79.411079);
  const [isLoading, setIsLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const [bucketList, setBucketList] = useState([
    "Train through the Canadian rockies",
    "Cherry blossoms at High Park",
    "Dinner at Shambhala Kitchen",
  ]);

  const addNewBLItem = () => {
    const newBLItem = prompt("Add your new item here!");
    const newBucketList = [...bucketList, newBLItem];
    setBucketList(newBucketList);
  }

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

  useEffect(() => {
    const API_KEY = "c2544eb8cdde7d734cba267b15af19b0";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => console.log(error));
  }, [latitude, longitude]);

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

  return (
    <div className="container bg-light">
      <h2 className="container-heading text-light bg-primary">Outings</h2>
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
      <div>
      </div>
      <div>
      <div class="card m-3 mx-auto" style={{width: "90%"}}>
        <div class="card-body bg-success">
          <h3 class="card-title text-light">Bucket List</h3>
          <p class="card-text text-light fs-5">Update your bucket list here..</p>
        </div>
        <ul className="list-group list-group-flush">
            {bucketList.map((item) => (<li className="list-group-item">{item}</li>))}
            <li className="list-group-item btn btn-success" onClick={addNewBLItem}>Add new!</li>
        </ul>
      </div>
      </div>
    </div>
  );
}

export default Outings;
