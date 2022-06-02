// CODE TAKEN FROM FULLSTACK LECTURES (on-campus-tracker) Slighlty modified to meet our needs
//Code from https://codesandbox.io/s/q9m26noky6?file=/src/helpers/AuthContext.js:0-638
import React from "react";
import { login } from "../api/loginAPI";
import {
  getToken,
  setToken,
  getUser,
  setUser,
  clearLocalStorage,
} from "../helpers/localStorage";
const INITIAL_STATE = {
  isAuth: false,
  token: null,
  user: null,
  accessLevel: 0,
  userID: "nothing",
};

const AuthContext = React.createContext();

class AuthContextProvider extends React.Component {
  state = { ...INITIAL_STATE };

  componentDidMount() {
    const token = getToken();
    const user = getUser();

    // convert userRole to accessLevel
    if (token && user) {
      let calculatedAccessLevel = this.calculateAccessLevel(user.role);
      this.setState({
        isAuth: true,
        token,
        user,
        userID: user.userID,
        accessLevel: calculatedAccessLevel,
      });
    }
  }

  // maybe put this in the auth file
  calculateAccessLevel(userRole) {
    switch (userRole) {
      case "manager":
        return 3;

      case "gardener":
        return 2;

      default:
        return 1;
    }
  }

  loginContext = async (email, password) => {
    try {
      let response = await login(email, password);
      if (response) {
        const { token, body } = response.data;

        let level = this.calculateAccessLevel(body.role);

        this.setState(
          {
            isAuth: true,
            token,
            user: body,
            userID: body.userID,
            accessLevel: level,
          },
          () => {
            //callback to store token
            setToken(token);
            setUser(body);
          }
        );

        return response;
      }
    } catch (error) {
      alert("user was not found");
      console.log(error);
    }
  };

  logout = () => {
    this.setState({ ...INITIAL_STATE }, () => {
      clearLocalStorage();
    });
  };

  generateHeaders = () => {
    const response = {};
    //we read the token from memory and if it is not yet defined, we try with the stored token
    const token = this.state.token || getToken();

    if (token) {
      response.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
    return response;
  };

  isAuthFunc = () => {
    //if isAuth is false but localStorage has token, then, we return true.
    return this.state.isAuth || getToken() != null;
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          isAuth: this.state.isAuth,
          isAuthFunc: this.isAuthFunc,
          token: this.state.token,
          user: this.state.user,
          userID: this.state.userID,
          accessLevel: this.state.accessLevel,
          loginContext: this.loginContext,
          logout: this.logout,
          generateHeaders: this.generateHeaders,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

const AuthContextConsumer = AuthContext.Consumer;
export { AuthContext, AuthContextProvider, AuthContextConsumer };
