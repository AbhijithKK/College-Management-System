import './Calander.css';
import Calanders from 'react-awesome-calendar';
import SideBarStudent from '../SideBar/SideBarStudent';
import React, { useEffect, useState, useCallback } from 'react';
import { Container } from 'react-bootstrap';

const Calander = () => {
  const [notificationPermission, setNotificationPermission] = useState('default');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Request permission for notifications when the component mounts
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        setNotificationPermission(permission);
      });
    }

    // Set the events once on component mount
    setEvents([
      {
        id: 1,
        color: '#fd3153',
        from: '2023-07-27T18:00:00+00:00',
        to: '2023-07-28T19:00:00+00:00',
        title: 'This is an event',
      },
      // Other events...
    ]);
  }, []);

  const handleEventClick = (event) => {
    showNotification(event.title);
  };

  const showNotification = useCallback((eventTitle) => {
    if (notificationPermission === 'granted') {
      const notification = new Notification('Event Reminder', {
        body: eventTitle,
      });

      notification.onclick = () => {
        console.log('Notification clicked!');
      };
    }
  }, [notificationPermission]);

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
    const interval = setInterval(() => showUpcomingEventNotifications(), 60000);

    return () => clearInterval(interval);
  }, [showUpcomingEventNotifications]);

  return (
    <div>
      <SideBarStudent />
      <Container>
        <Calanders events={events} onClickEvent={handleEventClick} />
      </Container>
    </div>
  );
};

export default Calander;
