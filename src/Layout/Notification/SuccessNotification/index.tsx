import React, { useState, useEffect } from "react";
import "./succes.scss";

const SuccessNotification = ({ message, duration = 3000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration]);
  console.log(message);

  return (
    <div className={`success-notification ${!visible ? "hidden" : ""}`}>
      {message}
    </div>
  );
};

export default SuccessNotification;
