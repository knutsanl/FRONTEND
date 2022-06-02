import react from "react";
import "./plantadd.css";
import { getSinglePlant } from "../../api/plantsAPI";
import { createPlant } from "../../api/managerAPI";
import plant from "./plant.png";

let initialValues = {
  plantID: "",
  wateredToday: "",
  location: "",
  plantName: "",
  lastTimeWatered: "",
  needsWaterBefore: "",
  wateringInterval: "",
  fertilizationInterval: "",
  fertilizationType: "",
  whoWatered: "",
  plantAbout: "",
};

class Plantadd extends react.Component {
  constructor(props) {
    super(props);

    this.state = {
      plant: { ...initialValues },
      plantHasLoadedIn: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCreateplant = this.handleCreateplant.bind(this);
  }

  handleCreateplant(e) {
    e.preventDefault();
    console.log(this.state.plant.plantID);
    createPlant(this.state.plant);
    const { history } = this.props;
    //history.goBack();
  }

  handleInputChange(event) {
    console.log(this.state.plant);
    const { name, value } = event.target;
    this.setState(
      (prevState) => ({
        plant: {
          ...prevState.plant,
          [name]: value,
        },
      }),
      () => {}
    );
  }

  render() {
    const {
      plantID,
      wateredToday,
      location,
      plantName,
      lastTimeWatered,
      needsWaterBefore,
      wateringInterval,
      whoWatered,
      plantAbout,
    } = this.state.plant;

    return (
      <div id="plantadd_box">
        <div className="plantadd_input_box">
          <h1>Add plant</h1>
          <form method="post" onSubmit={this.handleCreateplant}>
            <label htmlFor="Pname">Plant name:</label>
            <br />
            <input
              type="text"
              className="plantadd_input"
              id="Pname"
              onChange={this.handleInputChange}
              name="plantName"
            />
            <br />
            <br />
            <label htmlFor="Pinfo">Information about plant:</label>
            <br />
            <textarea
              rows="4"
              cols="50"
              className="p_edit_input"
              id="Pinfo"
              onChange={this.handleInputChange}
              name="plantAbout"
            ></textarea>
            <br />
            <br />
            <label htmlFor="Pplace">Location:</label>
            <br />
            <input
              type="text"
              className="p_edit_input"
              id="Pplace"
              onChange={this.handleInputChange}
              name="location"
            />
            <br />
            <br />
            <label htmlFor="Plink">Link:</label>
            <br />
            <input
              type="text"
              className="p_edit_input"
              id="Plink"
              onChange={this.handleInputChange}
              name="plantLink"
            />
            <br />
            <br />
            <label htmlFor="Pntbw">Needs to be watered every ______ days</label>
            <br />
            <input
              type="number"
              className="p_edit_input"
              id="Pntbw"
              onChange={this.handleInputChange}
              name="wateringInterval"
            />
            <br />
            <br />
            <label htmlFor="PfertilizeType">Fertilization type:</label>
            <br />
            <input
              type="text"
              className="p_edit_input"
              id="PfertilizeType"
              onChange={this.handleInputChange}
              name="fertilizerType"
            />
            <br />
            <br />
            <label htmlFor="fertilizeInterval">
              Needs to be fertilized every ______ days
            </label>
            <br />
            <input
              type="number"
              className="p_edit_input"
              id="fertilizeInterval"
              onChange={this.handleInputChange}
              name="fertilizationInterval"
            />
            <br />
            <br />
            <label htmlFor="plantID">Plant ID:</label>
            <br />
            <input
              onChange={this.handleInputChange}
              type="number"
              className="p_edit_input"
              name="plantID"
            />
            <br />
            <br />
            <label htmlFor="uploadPlantPicture">Upload picture: </label>
            <input type="file" id="uploadPlantPicture" />
            <br />
            <button
              type="submit"
              className="plantadd-buttons"
              id="plantadd_save_B"
            >
              Save Plant
            </button>
          </form>
        </div>
        <img src={plant} alt="its a plant" className="plantadd_img" />
      </div>
    );
  }
}
export default Plantadd;
