import react from "react";
import "./plantedit.css";
import { getSinglePlant } from "../../api/plantsAPI";
import { updatePlant } from "../../api/managerAPI";
import plant from "./plant.png";

let initialValues = {
  plantID: "",
  wateredToday: "",
  location: "",
  plantName: "",
  lastTimeWatered: "",
  needsWaterBefore: "",
  wateringInterval: "",
  whoWatered: "",
  fertilizationInterval: "",
  fertilizationType: "",

  plantLink: "",
};

class Plantedit extends react.Component {
  constructor(props) {
    super(props);

    this.state = {
      plant: { ...initialValues },
      plantHasLoadedIn: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleUpdateplant = this.handleUpdateplant.bind(this);
  }

  async componentDidMount() {
    // turn plantID into number
    console.log(this.props);
    let urlPlantParameter = parseInt(this.props.match.params.plantID);
    console.log(urlPlantParameter);

    // use the plantID as parameter to get plant
    let response = await getSinglePlant(urlPlantParameter);
    if (response) {
      this.setState({ plant: response.data.plant, plantHasLoadedIn: true });
    }
  }

  handleUpdateplant(e) {
    e.preventDefault();
    console.log(this.state.plant.plantID);
    updatePlant(this.state.plant.plantID, this.state.plant);
    const { history } = this.props;
    history.goBack();
  }

  handleInputChange(event) {
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
      fertilizationInterval,
      plantLink,
      fertilizationType,
    } = this.state.plant;

    return (
      <div id="plant_edit_box">
        <div className="plant_edit_input_box">
          <h1>Edit plant</h1>
          <form method="post" onSubmit={this.handleUpdateplant}>
            <label htmlFor="Pname">Plant name:</label>
            <br />
            <input
              type="text"
              className="p_edit_input"
              id="Pname"
              onChange={this.handleInputChange}
              name="plantName"
              value={plantName}
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
              value={plantAbout}
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
              value={location}
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
              value={plantLink}
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
              value={wateringInterval}
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
              value={fertilizationType}
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
              value={fertilizationInterval}
            />
            <br />
            <br />
            {/* <label htmlFor="plantID">Plant ID:</label>
            <br />
            <input
              onChange={this.handleInputChange}
              type="number"
              className="p_edit_input"
              name="plantID"
              value={plantID}
            />
            <br />
            <br /> */}
            <label htmlFor="uploadPlantPicture">Upload picture: </label>
            <input type="file" id="uploadPlantPicture" />
            <br />
            <button
              type="submit"
              className="plant-edit-buttons"
              id="plant_edit_save_B"
            >
              Save Plant
            </button>
          </form>
        </div>
        <img src={plant} alt="its a plant" className="plant_edit_img" />
      </div>
    );
  }
}
export default Plantedit;
