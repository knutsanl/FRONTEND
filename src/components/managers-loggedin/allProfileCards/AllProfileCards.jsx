import React, { Component } from "react";
import ProfileCard from "../ProfileCard/ProfileCard";
import axios from "axios";

import "./allProfileCards.css";

import { getUsers } from "../../../api/managerAPI";
import { AuthContext } from "../../../context/authContext";

export class AllProfileCards extends Component {
  constructor(props) {
    super(props);

    this.state = { allUsers: [], isLoggedIn: false };
  }

  async componentDidMount() {
    // https://dev.to/spartakyste/why-you-should-cancel-your-api-calls-in-react-410l
    // https://stackoverflow.com/questions/44852054/cant-cancel-axios-post-request-via-canceltoken
    // cancelling requests to prevent memory leaks when changing between sites
    this.axiosCancelSource = axios.CancelToken.source();

    if (this.context.isAuthFunc()) {
      let response = await getUsers(false, this.axiosCancelSource.token);
      if (response.data.length) {
        this.setState({ allUsers: response.data, isLoggedIn: true });
      }
    }
  }

  componentWillUnmount() {
    this.axiosCancelSource.cancel("Component unmounted.");
  }

  render() {
    return (
      <div className="allProfileCardsMainContainer">
        <h1 className="allUsersh1">All users</h1>
        <div className="allProfileCardsCardsContainer">
          {this.state.isLoggedIn &&
            this.state.allUsers.map((user) => {
              return <ProfileCard key={user.userID} user={user} />;
            })}
        </div>
      </div>
    );
  }
}

// For access to context
AllProfileCards.contextType = AuthContext;

export default AllProfileCards;
