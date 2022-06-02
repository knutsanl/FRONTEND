
import React, { Component } from "react";

// styles
import  "./notification.css";



class NotificationCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // destructuring props
    //const { notification } = this.props;
    //const { plantID, whenSent } = notification;
    return (
      <div className="notificationCard">
          <div className="notifCardText">
            <h2>
               {//} {plantID}
                }</h2>
            <p>The plant has one day left from 
                {//{whenSent}
   } til you need to water it.</p>
            <p>When the plant is watered, delete this notification.</p>
            </div>
            <div className="notifDelete">
            <button className="deleteNotification">Delete notification</button>
          </div>
      </div>
    );
  }
}
export default NotificationCard;
