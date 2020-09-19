import React, { useState, useCallback } from 'react';

export const NotificationContext = React.createContext({
  message: null,
  open: false,
  addMessage: () => {},
  removeMessage: () => {},
});

export default ({ children }) => {
  const [message, setMessage] = useState(null);
  const [open, setOpen] = useState(false);

  const removeMessage = () => {
    setMessage(null);
    setOpen(false);
  };

  const addMessage = (content, status) => {
    setMessage({ content, status });
    setOpen(true);
  };

  const contextValue = {
    message,
    open,
    addMessage: useCallback(
      (content, status) => addMessage(content, status),
      []
    ),
    removeMessage: useCallback(() => removeMessage(), []),
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};
