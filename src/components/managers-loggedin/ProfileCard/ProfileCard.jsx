// packages
import React, { Component } from "react";
import { Link } from "react-router-dom";

// styles
import  "./profileCard.css";


class ProfileCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClickClickOnProfileCard = (userID) => {};

  render() {
    // destructuring props
    const { user } = this.props;
    const { userID, fullName, role, place, email } = user;
    return (
      <div className="profileCard">
        <Link to={`/users/${userID}`}>
          <div>
            <h1>{fullName}</h1>
            <p>Role: {role}</p>
            <p>Place: {place}</p>
            <p>Email: {email}</p>
          </div>
        </Link>
      </div>
    );
  }
}
export default ProfileCard;
