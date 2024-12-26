import React from "react";
import "./notification.scss";
interface NotificationPopupProps {
  message: string | undefined;
  type: "success" | "error" | undefined;
}
const NotificationPopup: React.FC<NotificationPopupProps> = ({
  message,
  type,
}) => {
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    if (message && type) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, type]);

  return (
    <div className={`notification-popup ${type} ${visible ? "show" : "hide"}`}>
      {message}
    </div>
  );
};

export default NotificationPopup;
