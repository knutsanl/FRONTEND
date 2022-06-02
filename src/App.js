// packages and modules
import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";

// styles
import "./App.css";

// components
import Login from "./components/login/login.jsx";
import WelcomePage from "./components/welcome-page/welcomepage.jsx";
import Footer from "./components/Footer/footer.jsx";
import AllProfileCards from "./components/managers-loggedin/allProfileCards/AllProfileCards";
import AllPlantCards from "./components/allPlantCards/AllPlantCards";
import ProfileInfo from "./components/managers-loggedin/ProfileInfo/ProfileInfo";
import EditUser from "./components/managers-loggedin/edit-add-user/edit-user";
import AddUser from "./components/managers-loggedin/edit-add-user/add-user";
import NotFound from "./components/notFound/notFound";
import Notification from"./components/notification/notification";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

import { AuthContextConsumer } from "./context/authContext";
import PrivateRoute from "./routes/PrivateRoute";
import Plantinfo from "./components/PlantInfo/plantinfo";
import Plantedit from "./components/Plant-edit/plantedit";
import Plantadd from "./components/plantadd/plantadd";


class App extends Component {
  constructor(props) {
    super(props);

    this.state = { user: {}, isLoggedIn: false };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    this.setState({ isLoggedIn: true });
  }

  render() {
    return (
      <div>
        <AuthContextConsumer>
          {/* destrucutring values in the contextAPI 
          IsAuth is a state from the context that confirm authentication
          accessLevel checks authorization */}
          {({ isAuth, accessLevel }) => (
            <div className="App">
              <header>
                <div className="navbar">
                  <nav id="manager-nav">
                    <ul>
                      <li>
                        <Link to="/">Home</Link>
                      </li>
                      <li>
                        <Link to="/plants">Plants</Link>
                      </li>
                      <li>
                        <Link to="/users">
                          {accessLevel > 2 ? "Users" : ""}
                        </Link>
                      </li>
                      <li>
                        <Link to="/addPlant">
                          {accessLevel > 2 ? "Add Plant" : ""}
                        </Link>
                      </li>
                      <li>
                        <Link to="/addUser">
                          {accessLevel > 2 ? "Add user" : ""}
                        </Link>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <Link to={`/notifications`}>
                          {isAuth ? <FontAwesomeIcon icon={faBell} /> : ""}
                        </Link>
                      </li>
                      <li>
                        <Link to="/login">{isAuth ? "Log out" : "Log in"}</Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </header>
              <main>
                <Switch>
                  <Route exact path="/" component={WelcomePage} />

                  <Route path="/login" component={Login} />

                  {/* User related */}

                  <Route path="/addUser" component={AddUser} />

                  <Route path="/users/:userID/update" component={EditUser} />

                  <Route path="/users/:userID" component={ProfileInfo} />

                  <Route path="/notifications" component={Notification} />

                  <PrivateRoute exact path="/users">
                    <AllProfileCards />
                  </PrivateRoute>

                  {/* Plant related */}

                  <Route path="/plants/:plantID/update" component={Plantedit} />

                  <Route path="/plants/:plantID" component={Plantinfo} />

                  <Route exact path="/plants" component={AllPlantCards} />

                  <Route path="/addPlant" component={Plantadd} />

                  <Route component={NotFound} />
                </Switch>

                <Footer />
              </main>
            </div>
          )}
        </AuthContextConsumer>
      </div>
    );
  }
}

export default App;
