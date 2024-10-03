import React, { useEffect } from "react";
import "./notification.scss";
import { SvgXIcon } from "../../Components/@svg/SvgXIcon";

interface NotificationLabelProps {
  message: string;
  type: "success" | "error";
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
}

const NotificationLabel: React.FC<NotificationLabelProps> = ({
  message,
  type,
  isVisible,
  setIsVisible,
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000); // 3 seconds

      return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }
  }, [isVisible, setIsVisible]);

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
    <div className="notification_label" style={getLabelStyle()}>
      {message}
      <button
        className="notification_label-button"
        style={getLabelStyle()}
        onClick={() => setIsVisible(false)}
      >
        <SvgXIcon />
      </button>
    </div>
  );
};

export default NotificationLabel;
