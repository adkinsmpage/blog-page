import React, { createContext, useEffect, useState } from "react";

interface INotificationContextProvider {
  children: React.ReactNode;
}

export interface INotificationObj {
  title: string;
  message: string;
  status: string;
}

const emptyNotification = { title: "", message: "", status: "" };

const NotificationContext = createContext({
  notificationObj: emptyNotification,
  showNotification: (notificationData: INotificationObj) => {},
  hideNotification: () => {},
});

export const NotificationContextProvider = ({
  children,
}: INotificationContextProvider) => {
  const [notification, setNotification] =
    useState<INotificationObj>(emptyNotification);

  const showNotification = (notificationData: INotificationObj) => {
    setNotification(notificationData);
  };

  const hideNotification = () => setNotification(emptyNotification);

  const context = {
    notificationObj: notification,
    showNotification,
    hideNotification,
  };

  useEffect(() => {
    if (notification.status === "success" || notification.status === "error") {
      const timer = setTimeout(() => {
        setNotification(emptyNotification);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [notification.status]);

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
