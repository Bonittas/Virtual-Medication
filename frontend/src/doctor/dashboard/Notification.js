import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotifications } from '../../actions/notificationActions';
import Nav from './dashboard'
import Footer from "../../home/footer"
import Appointmets_Request from "./appointmentRequests"

const Notification = () => {
  const dispatch = useDispatch();
  const { notifications, loading, error } = useSelector(state => state.notifications);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  if (loading) {
    return <div>Loading notifications...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
    <Nav/>
    <div className='my-20 bg-green-100 px-4 items-center py-4 h-24 w-2/3 text-center m-6 rounded-md'>
      {notifications.length > 0 ? (
        <ul className=''>
          {notifications.map(notification => (
            <li className='text-lg w-2/3 ' key={notification._id}>{notification.message}</li>
          ))}
        </ul>
      ) : (
        <p>No notifications found.</p>
      )}
    </div>
    <div className="bg-green-600">
    <Footer/>
    </div>
    </>
  );
};

export default Notification;
