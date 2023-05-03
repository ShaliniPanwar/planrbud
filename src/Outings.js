import React, { useState, useEffect } from "react";
import outingsIcon from './outingsIcon.png';

function Outings() {
  
  const [bucketList, setBucketList] = useState([
    "Train through the Canadian rockies",
    "Cherry blossoms at High Park",
    "Dinner at Shambhala Kitchen",
  ]);

  const addNewBLItem = () => {
    const newBLItem = prompt("Add your new item here!");
    const newBucketList = [...bucketList, newBLItem];
    setBucketList(newBucketList);
  };

  return (
    <div className="container bg-light">
      <h2 className="container-heading text-light bg-primary">Outings</h2>
      <img src={outingsIcon} alt="outings-icon" className="tab-icon"/>
      <div>
      <div className="card m-3 mx-auto" style={{width: "90%"}}>
        <div className="card-body bg-success">
          <h3 className="card-title text-light">Bucket List</h3>
          <p className="card-text text-light fs-5">Update your bucket list here..</p>
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
