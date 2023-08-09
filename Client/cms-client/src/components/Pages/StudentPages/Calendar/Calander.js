// Calander.js
import "./Calander.css";
import Calanders from "react-awesome-calendar";
import SideBarStudent from "../SideBar/SideBarStudent";
import React, { useEffect, useState, useCallback } from "react";
import { Container } from "react-bootstrap";
import { ApiStudentCalender } from "../../../api/StudentApi";

const Calander = () => {
  const [notificationPermission, setNotificationPermission] =
    useState("default");
  const [events, setEvents] = useState([]);

  const showNotification = useCallback(
    (eventTitle) => {
      if (notificationPermission === "granted") {
        const notification = new Notification("Event Reminder", {
          body: eventTitle,
        });

        notification.onclick = () => {
          console.log("Notification clicked!");
        };
      }
    },
    [notificationPermission]
  );

  useEffect(() => {
    // Request permission for notifications when the component mounts
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        setNotificationPermission(permission);
      });
    }

    // Set the events once on component mount
    GetApi();
  }, []);

  const handleEventClick = useCallback(
    (event) => {
      showNotification(event.title);
    },
    [showNotification]
  );

  const showUpcomingEventNotifications = useCallback(() => {
    const now = new Date().getTime();

    for (const event of events) {
      const eventTime = new Date(event.from).getTime();
      const timeDifference = eventTime - now;

      if (timeDifference > 0 && timeDifference <= 60000) {
        showNotification(event.title);
      }
    }
  }, [events, showNotification]);

  useEffect(() => {
    // Set up an interval for upcoming event notifications when the component mounts
    const interval = setInterval(() => showUpcomingEventNotifications(), 60000);

    return () => clearInterval(interval);
  }, [showUpcomingEventNotifications]);

  const GetApi = async () => {
    let data = await ApiStudentCalender();
    setEvents(data);
  };

  

  return (
    <div style={{ backgroundColor: "gray", height: "100vh" }}>
      <SideBarStudent />
      <div className="maindivCalander">
        <Container>
          {/* Use the handleRef callback to get the ref */}
          <Calanders
           
            events={events}
            onClickEvent={handleEventClick}
          />
        </Container>
      </div>
    </div>
  );
};

export default Calander;
