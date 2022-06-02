import axios from "axios";

import { getToken } from "../helpers/localStorage";

// ---------------------------- MANAGER ONLY ------------

// ---------- USER RELATED --------

// get all users or provide a url parameter to get single user
const getUsers = (userID, sourceToken) => {
  // if userID is provided then find the specific user
  if (userID) {
    return axios.get(`/profiles/${userID}?`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      cancelToken: sourceToken,
    });
  }
  // else return all users
  else {
    return axios.get(`/profiles`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      cancelToken: sourceToken,
    });
  }
};

// create a new user using body data
const createUser = (userData) => {
  return axios.post("/createProfile", userData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

// update user by adding the userID as userToUpdate and the data to update as updateUserData
const updateUser = (userToUpdate, updateUserData) => {
  return axios.patch(`/profiles/${userToUpdate}/update`, updateUserData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

const deleteUser = (userToDelete) => {
  return axios.delete(`/profiles/${userToDelete}/delete`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};
// ------------ PLANT RELATED -----------

// update plant by adding the plantID as plantToUpdate and the data to update as updatePlantData
const updatePlant = async (plantToUpdate, updatePlantData) => {
  let updatedPlant = await axios.patch(
    `/plants/${plantToUpdate}/update/`,
    updatePlantData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
  console.log(updatedPlant);
  return updatedPlant;
};

// create a new plant with body
const createPlant = async (createData) => {
  console.log(createData);
  return axios.post("/createPlant", createData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

// delete plant by plantID as plantToDelete
const deletePlant = async (plantToDelete) => {
  let deletedPlant = await axios.delete(`/plants/${plantToDelete}/delete`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  console.log(deletedPlant);
  // return deletedPlant;
};

// exporting axios functions
export {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  updatePlant,
  createPlant,
  deletePlant,
};
