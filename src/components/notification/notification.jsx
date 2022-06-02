import React, { Component } from "react";
import NotificationCard from "./notificationCard";

import "./notification.css";

class Notification extends Component {
  render() {
    return (
      <div className="notificationMainContainer">
        <h1>Notifications</h1>
        <div className="notificationCardsContainer">
            <NotificationCard />
            <NotificationCard />
        </div>
      </div>
    );
  }
}

export default Notification;
