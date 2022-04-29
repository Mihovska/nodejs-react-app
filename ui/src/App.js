import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Sidebar from './components/Sidebar';

export default function App() {
  const [starships, setStarships] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  const baseUrl = '/api/starShips';

    useEffect(() => {
       axios.get(baseUrl)
           .then(response => setStarships(response.data.data));
    }, []);

  function updateClicksValue(index) {
    // Make a shallow copy of the array
    let temp_state = [...starships];
    // Make a shallow copy of the ship to mutate
    let temp_ship = {...temp_state[index]};
    // Update the property 'timesClicked'
    temp_ship.timesClicked = temp_ship.timesClicked + 1;
    //  Put it back into the array.
    temp_state[index] = temp_ship;
    // Update the state
    setStarships(temp_state);
    updateShipInDB(temp_ship)
  }

  function updateShipInDB(ship) {
    axios.put(baseUrl, ship)
    .then(response => console.log(response.data));
  }

  const squareElements = starships.map((ship, index) => (
      <Main
          key={ship.starship}
          onClick={() => updateClicksValue(index)}
          name={ship.starship}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
      />
  ));

  const shipsList = starships.map(ship => (
      <Sidebar
          key={ship.starship}
          name={ship.starship}
          number={ship.timesClicked}
          color={isHovered ? "#FB0A0A" : "#25d2ac"}
      />
  ));

  return (
      <>
        <Navbar/>
        {squareElements}
        <nav className="sidebar">
          <ul className="starships--list">
            {shipsList}
          </ul>
        </nav>
      </>
  )
}