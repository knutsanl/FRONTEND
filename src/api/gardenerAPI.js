import axios from "axios";

import { getToken } from "../helpers/localStorage";

// get your own user
export const getOwnProfile = () => {
  return axios.get("/profile", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const updateOwnUser = (updateUserData) => {
  return axios.patch(`/profile/update`, updateUserData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

// fulfill water task. function needs the plantid as a parameter to find which plant and the data about who and when the plant was watered.
export const waterPlantTask = async (plantID, updateData) => {
  let wateredPlant = await axios.patch(
    `/plants/${plantID}/water`,
    { lastTimeWatered: updateData },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
};

// fulfill water task. function needs the plantid as a parameter to find which plant and the data about who and when the plant was watered.
export const fertilizePlantTask = async (plantID, updateData) => {
  let fertilizedPlant = await axios.patch(
    `/plants/${plantID}/fertilize`,
    { lastTimeFertilized: updateData },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
};
