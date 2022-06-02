// packages
import React, { Component } from "react";

// local files
import { createUser } from "../../../api/managerAPI";
import "./edit-add-user.css";

let initialValues = {
  userID: "",
  email: "",
  fullName: "",
  password: "",
  place: "",
  role: "",
};

class AddUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: { ...initialValues },
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCreateUser = this.handleCreateUser.bind(this);
  }

  handleCreateUser(e) {
    e.preventDefault();
    createUser(this.state.user);

    const { history } = this.props;
    history.goBack();
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState(
      (prevState) => ({
        user: {
          ...prevState.user,
          [name]: value,
        },
      }),
      () => {
      }
    );
  }

  render() {
    const { userID, email, fullName, place, password, role } = this.state.user;

    return (
      <div className="add-user-main">
        <h1>Add user</h1>

        <form method="post" onSubmit={this.handleCreateUser}>
          <label htmlFor="userID">User Id:</label>
          <input
            onChange={this.handleInputChange}
            type="number"
            className="user-formfield"
            id="userID"
            name="userID"
            value={userID}
            required
          />
          <label htmlFor="usersName">Name:</label>
          <input
            onChange={this.handleInputChange}
            type="text"
            className="user-formfield"
            id="usersName"
            name="fullName"
            value={fullName}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            onChange={this.handleInputChange}
            type="text"
            className="user-formfield"
            id="password"
            name="password"
            value={password}
            required
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
            required
          />
          <label htmlFor="place">Place:</label>
          <input
            onChange={this.handleInputChange}
            type="text"
            className="user-formfield"
            id="place"
            name="place"
            value={place}
            required
          />
          <input id="save-user-button" type="submit" value="Save user" />
        </form>
      </div>
    );
  }
}

export default AddUser;
