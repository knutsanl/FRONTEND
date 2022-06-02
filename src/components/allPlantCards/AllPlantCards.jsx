import React, { Component } from "react";
import PlantCard from "../PlantCard/PlantCard";
import { Link } from "react-router-dom";
import axios from "axios";

import "./allPlantCards.css";

import { getPlants } from "../../api/plantsAPI";

class AllPlantCards extends Component {
  constructor(props) {
    super(props);

    this.state = { allPlants: [] };
  }

  async componentDidMount() {
    this.axiosCancelSource = axios.CancelToken.source();

    let response = await getPlants(this.axiosCancelSource.token);
    console.log(response);
    if (response) {
      this.setState({ allPlants: response.data });
    }
  }

  componentWillUnmount() {
    console.log("unmount component");
    this.axiosCancelSource.cancel("Component unmounted.");
  }

  render() {
    return (
      <div className="allPlantCardsMainContainer">
        <h1>All plants</h1>
        <div className="allPlantCardsCardsContainer">
          {this.state.allPlants.length > 0 &&
            this.state.allPlants.map((plant) => {
              return <PlantCard key={plant.plantID} plants={plant} />;
            })}
        </div>
      </div>
    );
  }
}

export default AllPlantCards;
