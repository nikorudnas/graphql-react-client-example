// Import modules
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import PropTypes from 'prop-types';

// Dialog component to display errors
class ErrorDialog extends Component {
  state = {
    openDialog: true,
  };

  // Close the dialog
  handleClose = () => {
    this.setState({ openDialog: false });
  };

  render() {
    // Takes the error message as prop and displays it to the user in a dialog
    const { message } = this.props;
    const { openDialog } = this.state;
    return (
      <div>
        <Dialog
          PaperProps={{ style: { maxWidth: 550 } }}
          open={openDialog}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          disableRestoreFocus
        >
          <DialogTitle id="alert-dialog-title">Message:</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {message && message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

// Define proptypes
ErrorDialog.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorDialog;
