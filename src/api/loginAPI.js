import axios from "axios";

const login = (email, password) => {
  return axios.post("/login", {
    email: email,
    password: password,
  });
};

export { login };
