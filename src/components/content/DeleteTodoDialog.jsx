// Import modules
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import LoaderHandler from '../utils/LoaderHandler';
import ErrorHandler from '../utils/ErrorHandler';
import logger from '../utils/logger';

// Delete todo mutation
// Send: todo_id
// Done: refetchQueries={['allTodos']}
const DELETETODO = gql`
  mutation DeleteTodo($_id: ObjectID!) {
    deleteTodo(_id: $_id) {
      content
    }
  }
`;

// Styles
const styles = {
  spanRemove: {
    flex: 1,
    color: '#DD2C00',
    margin: 5,
    cursor: 'pointer',
  },
};

// DeleteTodo component
class DeleteTodo extends Component {
  state = {
    open: false,
  };

  // Handle input changes
  handleChange = name => e => {
    this.setState({ [name]: e.target.value });
  };

  // Handle dialog close
  handleClose = () => {
    this.setState({ open: false });
  };

  // Handle dialog open
  handleOpen = () => {
    this.setState({ open: true });
  };

  // Handle create -button submit
  async handleSubmit(e, deletetodo) {
    e.preventDefault();

    const { item } = this.props;

    try {
      await deletetodo({
        variables: {
          _id: item._id,
        },
      });
      // If delete was successful, close the dialog
      this.handleClose();
    } catch (error) {
      logger(error);
    }
  }

  render() {
    const { open } = this.state;
    const { item } = this.props;
    return (
      <Mutation mutation={DELETETODO} refetchQueries={['allTodos']}>
        {(deletetodo, { loading, error }) => (
          <div style={{ display: 'flex' }}>
            <Tooltip title="Delete" placement="top-end">
              <span
                style={styles.spanRemove}
                role="button"
                tabIndex={0}
                onClick={() => this.handleOpen()}
                onKeyUp={() => this.handleOpen()}
              >
                <DeleteIcon />
              </span>
            </Tooltip>
            <Dialog
              fullWidth
              open={open}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              disableRestoreFocus
              PaperProps={{ style: { minWidth: 260 } }}
            >
              <form
                autoComplete="off"
                onSubmit={async e => this.handleSubmit(e, deletetodo)}
              >
                <DialogTitle id="alert-dialog-title">Delete todo:</DialogTitle>
                <DialogContent>
                  <h5>{item._id}</h5>
                  <h4>{item.content}</h4>
                </DialogContent>
                <DialogActions>
                  <Button
                    variant="outlined"
                    value="submit"
                    type="submit"
                    color="primary"
                  >
                    OK
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={this.handleClose}
                    color="secondary"
                  >
                    Cancel
                  </Button>
                </DialogActions>
              </form>
            </Dialog>
            {loading && <LoaderHandler />}
            {error && (
              <ErrorHandler
                message={
                  error.graphQLErrors[0].message
                    ? error.graphQLErrors[0].message
                    : error.toString()
                }
              />
            )}
          </div>
        )}
      </Mutation>
    );
  }
}

// Define proptypes
DeleteTodo.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
};

export default DeleteTodo;
