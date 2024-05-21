/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Bell } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getNotificationsByUserId,
  updateNotificationsById,
} from "../../app/actions/notification.action";
import { CiSquareRemove } from "react-icons/ci";
import { AiOutlineNotification } from "react-icons/ai";

function NotificationDropdown() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userId);
  const notifications = useSelector(
    (state) => state.notification.notifications
  );
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (userId) {
      dispatch(getNotificationsByUserId(userId));
    }
  }, [dispatch, userId]);

  const handleOnRead = (id) => {
    const updateNotification = {
      id,
      isRead: true,
    };
    dispatch(updateNotificationsById(updateNotification));
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        className="relative pt-2"
        onClick={toggleDropdown}
        id="notification-dropdown"
        aria-expanded={isOpen}
      >
        <Bell />
      </button>
      {isOpen && (
        <ul
          className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-20"
          aria-labelledby="notification-dropdown"
        >
          {notifications && notifications.length ? (
            [...notifications]
              .reverse()
              .slice(-5)
              .map((notification) => (
                <li key={notification.id} className="px-4 py-2 border-b last:border-none">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center">
                      <AiOutlineNotification className="mr-2" />
                      {notification.message}
                    </span>
                    <CiSquareRemove
                      size={20}
                      className="text-danger cursor-pointer"
                      onClick={() => {
                        handleOnRead(notification.id);
                      }}
                    />
                  </div>
                </li>
              ))
          ) : (
            <li className="px-4 py-2">
              <span>No Notifications yet</span>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

export default NotificationDropdown;
