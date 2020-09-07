import React, { useState, useImperativeHandle, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

const Togglable = forwardRef(({ buttonLabel, children }, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          style={{ marginTop: 10 }}
          color="primary"
          variant="outlined"
          onClick={toggleVisibility}
        >
          {buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <Button
          style={{ marginTop: 10 }}
          color="primary"
          variant="outlined"
          onClick={toggleVisibility}
        >
          cancel
        </Button>
      </div>
    </div>
  );
});

Togglable.displayName = 'Togglable';

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Togglable;
