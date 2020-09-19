import React, { useContext } from 'react';
import { NotificationContext } from '../context';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Notify = () => {
  const classes = useStyles();
  const { message, open, removeMessage } = useContext(NotificationContext);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    removeMessage();
  };

  if (!message) {
    return null;
  }

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={message.status}>
          {message.content}
        </Alert>
      </Snackbar>
    </div>
  );
  // <div style={{ color: 'red' }}>{errorMessage}</div>;
};

export default Notify;
