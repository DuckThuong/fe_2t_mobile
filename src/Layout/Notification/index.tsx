import React, { useEffect, useState } from "react";
import "./notification.scss";
import { SvgXIcon } from "../../Components/@svg/SvgXIcon";

interface NotificationLabelProps {
  message: string;
  type: "success" | "error";
}

const NotificationLabel: React.FC<NotificationLabelProps> = ({
  message,
  type,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsClosing(true);
        setTimeout(() => setIsVisible(false), 500); // Match the animation duration
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const getLabelStyle = () => {
    switch (type) {
      case "success":
        return { background: "green" };
      case "error":
        return { background: "red" };
      default:
        return {};
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className={`notification_label ${isClosing ? "closing" : ""}`}
      style={getLabelStyle()}
    >
      {message}
      <button
        className="notification_label-button"
        style={getLabelStyle()}
        onClick={() => {
          setIsClosing(true);
          setTimeout(() => setIsVisible(false), 500); 
        }}
      >
        <SvgXIcon />
      </button>
    </div>
  );
};

export default NotificationLabel;
