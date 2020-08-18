import React from "react";

const Notification = ({ message }) => {
  if (message.description === "") {
    return null;
  }

  return <div className={message.type}>{message.description}</div>;
};
export default Notification;
