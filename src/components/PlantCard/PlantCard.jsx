import "./PlantCard.css";
import react, { Component } from "react";
import {
  Route,
  Switch,
  Link,
  useRouteMatch,
  useParams,
  useLocation,
} from "react-router-dom";
import Plantinfo from "../PlantInfo/plantinfo";
import plant from "./plant.png";
import {
  formatDateAndTime,
  calculateNeedsWaterBefore,
  calculateNeedsWaterIn,
  findDifferenceInDates,
  
} from "../../helpers/functions";

// https://css-tricks.com/everything-you-need-to-know-about-date-in-javascript/

class PlantCard extends Component {
  constructor(props) {
    super(props);

    // state keeps track of the timer
    this.state = { needsWaterIn: " " };
  
  }

  handleOnClickPlantCard(plantID) {
    console.log(plantID);
  }
  
  render() {
    // destrucuring props
    const {
      lastTimeWatered,
      location,
      needsWaterBefore,
      plantID,
      plantName,
      wateredToday,
      wateringInterval,
      whoWatered,
    } = this.props.plants;
      
    return (
      <div
        className="PlantCard-mainBox"
        onClick={() => this.handleOnClickPlantCard(plantID)}
      >
        <Link to={`/plants/${plantID}`}>
          <div className="PlantCard-pictureBox">
            <img src={plant} alt="its a plant" className="plant_card_img" />
          </div>
          <div className="PlantCard-rendered-text">
            <h2>{plantName}</h2>
            <p>Location: {location}</p>
            <p>Last watered: {formatDateAndTime(lastTimeWatered)}</p>
            
            {/* Her må vi ha en funksjon som regner ut hvor lenge det er siden sist og hvor lang intervallen er
          Funksjonen needswaterbefore er ikke funksjonell */}
            <p>Next watering: {calculateNeedsWaterBefore(this.props.plants)}</p>
            <p>Need water in: <b>{findDifferenceInDates(this.props.plants)} days!</b></p>
          </div>
        </Link>
      </div>
    );
  }
}

export default PlantCard;
