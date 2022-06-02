import react from "react";
import "./plantinfo.css";
import { Link } from "react-router-dom";
import plant from "./plant.png";

// API functions
import { getPlants, getSinglePlant } from "../../api/plantsAPI";
import { updatePlant, deletePlant } from "../../api/managerAPI";
import { waterPlantTask, fertilizePlantTask } from "../../api/gardenerAPI";

// context
import { AuthContext } from "../../context/authContext";

// helper functions
import {
  formatDateAndTime,
  calculateNeedsWaterBefore,
  calculateNeedsWaterIn,
  findDifferenceInFertilizationDates,
  calculateNeedsFertilizationIn,
} from "../../helpers/functions";

class Plantinfo extends react.Component {
  constructor(props) {
    super(props);

    this.state = { plant: {}, plantHasLoadedIn: false };
    this.handleDeletion = this.handleDeletion.bind(this);
    this.handleTask = this.handleTask.bind(this);
  }

  async componentDidMount() {
    let urlPlantIDParam = parseInt(this.props.match.params.plantID);
    let response = await getSinglePlant(urlPlantIDParam);
    this.setState({ plant: response.data.plant, plantHasLoadedIn: true });
    console.log(this.state.plant);
  }

  handleDeletion() {
    let plantToDelete = this.state.plant.plantID;

    deletePlant(plantToDelete);
    // https://dev.to/kozakrisz/react-router---how-to-pass-history-object-to-a-component-3l0j to redirect
    const { history } = this.props;
    history.goBack();
  }

  handleTask(task) {
    let dateToday = new Date().toUTCString();
    if (task == "water") {
      this.setState(
        (prevState) => ({
          plant: {
            ...prevState.plant,
            lastTimeWatered: dateToday,
          },
        }),
        () => {
          waterPlantTask(
            this.state.plant.plantID,
            this.state.plant.lastTimeWatered
          );
        }
      );
    } else {
      this.setState(
        (prevState) => ({
          plant: {
            ...prevState.plant,
            lastTimeFertilized: dateToday,
          },
        }),
        () => {
          console.log(this.state.plant);
          fertilizePlantTask(
            this.state.plant.plantID,
            this.state.plant.lastTimeFertilized
          );
        }
      );
    }
  }

  render() {
    const {
      plantID,
      plantName,
      lastTimeWatered,
      needsWaterBefore,
      wateringInterval,
      wateredToday,
      whoWatered,
      location,
      fertilizerType,
      lastTimeFertilized,
      needsFertilizationBefore,
      fertilizationInterval,
      plantLink,
      plantAbout,
    } = this.state.plant;

    return (
      <div id="plant_info_box">
        <div id="plant_info_P_box">
          <h1 id="plant_info_h1">{plantName}</h1>
          <div>
            <h2>About plant</h2>
            <p>{plantAbout}</p>
            <p>Place: {location}</p>
            <p>
              Do you want to read more about this plant? then click here{" "}
              <a href={plantLink} target="_blank">
                {plantName}
              </a>
            </p>
          </div>

          <div>
            <h3>Watering</h3>
            <p>It needs to be watered once every {wateringInterval} days</p>
            <p>
              Last watered: {formatDateAndTime(lastTimeWatered)} by {whoWatered}
            </p>
            <p>
              Needs to be watered: {calculateNeedsWaterBefore(this.state.plant)}
            </p>
            {/* Her må vi regne ut hvor lenge det er igjen */}
            <h4>
              Watering countdown:{calculateNeedsWaterIn(this.state.plant)}{" "}
            </h4>
          </div>

          <div>
            <h3>Fertilizer</h3>
            <p>Fertilizer type: {fertilizerType}</p>
            <p>Fertilization interval: {fertilizationInterval} day</p>
            <p>Last fertilized: {formatDateAndTime(lastTimeFertilized)}</p>
            <p>
              Needs to be fertilized:
              {calculateNeedsFertilizationIn(this.state.plant)}
            </p>
            {/* Her må vi regne ut hvor lenge det er igjen */}
            <h4>
              Fertilizing countdown:{" "}
              {findDifferenceInFertilizationDates(this.state.plant)} days
            </h4>
          </div>

          <p>
            Do you want to read more about this plant? then click here{" "}
            <a href={plantLink} target="_blank">
              {plantName}
            </a>
          </p>
          {this.context.accessLevel > 1 ? (
            <div>
              <button
                onClick={() => this.handleTask("water")}
                className="plant-info-buttons"
                id="plant_info_B_water"
              >
                Water Plant
              </button>
              <button
                onClick={this.handleTask}
                className="plant-info-buttons"
                id="plant_info_B_water"
              >
                Fertilize Plant
              </button>
            </div>
          ) : (
            <div>
              <h4>Alert the gardeners that this plant needs attention</h4>
              <button
                // må lage en need water attention funksjon som gir varsling og koble til backend
                // onClick={() => this.handleTask("water")}
                className="plant-info-buttons"
                id="plant_info_B_water"
              >
                Needs Watering
              </button>
              <button
                // må lage en need water attention funksjon som gir varsling og koble til backend

                // onClick={this.handleTask}
                className="plant-info-buttons"
                id="plant_info_B_water"
              >
                Needs Fertilizing
              </button>
            </div>
          )}
        </div>

        <div id="plant_info_P_box_R">
          {this.context.accessLevel > 2 && (
            <Link to={`/plants/${plantID}/update`}>
              <button className="plant-info-buttons" id="plant_info_B_edit">
                Edit Plant
              </button>
            </Link>
          )}
          {this.context.accessLevel > 2 && (
            <button
              onClick={this.handleDeletion}
              className="plant-info-buttons"
              id="delete-plant-button"
            >
              Delete Plant
            </button>
          )}
          <img src={plant} alt="its a plant" className="plant_info_img" />
        </div>
      </div>
    );
  }
}
// For access to context
Plantinfo.contextType = AuthContext;
export default Plantinfo;
