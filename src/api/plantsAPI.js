import axios from "axios";

//------------------------------------------------------------------ NO AUTH NEEDED ----------------------------------------------
// PLANT ROUTES
const getPlants = async (sourceToken) => {
  let allPlants = await axios
    .get("/plants", { cancelToken: sourceToken })
    .catch((err) => console.log("error getting all plants", err));
  console.log(allPlants);
  return allPlants;
};

const getSinglePlant = async (plantID) => {
  let singlePlant = await axios
    .get(`/plants/${plantID}`)
    .catch((err) => console.log("error getting single plant", err));
  console.log(singlePlant);
  return singlePlant;
};

export { getPlants, getSinglePlant };
