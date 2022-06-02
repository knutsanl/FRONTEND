import React, { Component } from "react";
import "./edit-add-user.css";
import { getUsers, updateUser } from "../../../api/managerAPI";

let initialValues = {
  userID: "",
  email: "",
  fullName: "",
  password: "",
  place: "",
  role: "",
};

class EditUser extends Component {
  constructor(props) {
    super(props);

    this.state = { user: { ...initialValues }, userHasLoadedIn: false };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleUpdateUser = this.handleUpdateUser.bind(this);
  }

  handleUpdateUser(e) {
    e.preventDefault();
    updateUser(this.state.user.userID, this.state.user);
    const { history } = this.props;
    history.goBack();
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        [name]: value,
      },
    }));
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

  render() {
    const { place, role, email, fullName } = this.state.user;
    return (
      <div>
        {this.state.userHasLoadedIn && (
          <div className="add-user-main">
            <h1>Edit user {fullName}</h1>
            <p>Fill inn the field you want to update.</p>

            <form method="post" onSubmit={this.handleUpdateUser}>
              <label htmlFor="usersName">Name:</label>
              <input
                onChange={this.handleInputChange}
                type="text"
                className="user-formfield"
                id="usersName"
                name="fullName"
                value={fullName}
              />
              <p>Role:</p>
              <input
                type="radio"
                id="gardener-option"
                name="role"
                checked={role === "gardener"}
                className="radio-input"
                value="gardener"
                onChange={this.handleInputChange}
              />
              <label htmlFor="gardener">Gardener</label>
              <input
                type="radio"
                id="manager-option"
                name="role"
                checked={role === "manager"}
                className="radio-input"
                value="manager"
                onChange={this.handleInputChange}
              />
              <label htmlFor="manager">Manager</label> <br />
              <label htmlFor="userEmail">Email:</label>
              <input
                onChange={this.handleInputChange}
                type="email"
                className="user-formfield"
                id="userEmail"
                name="email"
                value={email}
              />
              <label htmlFor="place">Place:</label>
              <input
                onChange={this.handleInputChange}
                type="text"
                className="user-formfield"
                id="place"
                name="place"
                value={place}
              />
              <button id="save-user-button">Update User</button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default EditUser;
