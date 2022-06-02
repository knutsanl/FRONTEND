// packages
import React, { Component } from "react";
import { Link } from "react-router-dom";

// local files
import "./profileInfo.css";

// API functions
import { getUsers, deleteUser } from "../../../api/managerAPI";

class Profileinfo extends Component {
  constructor(props) {
    super(props);

    this.state = { user: {}, userHasLoadedIn: false };

    // binds
    this.handleDeletion = this.handleDeletion.bind(this);
  }

  async componentDidMount() {
    // turn userID into number
    let urlUserIDParam = parseInt(this.props.match.params.userID);

    // use the userID as parameter to get user
    let response = await getUsers(urlUserIDParam);
    if (response) {
      this.setState({ user: response.data.user, userHasLoadedIn: true });
    }
  }

  handleDeletion() {
    let userToDelete = this.state.user.userID;

    deleteUser(userToDelete);
    // https://dev.to/kozakrisz/react-router---how-to-pass-history-object-to-a-component-3l0j to redirect
    const { history } = this.props;
    history.goBack();
  }

  render() {
    const { place, role, email, userID, fullName } = this.state.user;

    return (
      <div>
        {this.state.userHasLoadedIn && (
          <div id="user-profile-main">
            <h1>{fullName}</h1>
            <p>Role: {role}</p>
            <p>Place: {place}</p>
            <p>Email: {email}</p>
            <Link to={`/users/${userID}/update`}>
              <button className="profile-user-button" id="edit-user-button">
                Edit user
              </button>
            </Link>

            <button
              onClick={this.handleDeletion}
              className="profile-user-button"
              id="delete-user-button"
            >
              Delete user
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Profileinfo;
