// Import modules
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import LoaderHandler from '../utils/LoaderHandler';
import ErrorHandler from '../utils/ErrorHandler';
import logger from '../utils/logger';

// Create todo mutation
// Send: todo: { title, description }
// Done: refetchQueries={['allTodos']}
const CREATETODO = gql`
  mutation CreateTodo($todo: CreateTodoInput!) {
    createTodo(todo: $todo)
  }
`;

// Styles
const styles = {
  fab: {
    margin: 8,
  },
  paper: {
    minWidth: 260,
  },
};

// CreateTodo component
class CreateTodo extends Component {
  state = {
    open: false,
    todo: { title: '', description: '' },
    inputError: false,
  };

  // Handle input changes
  handleChange = name => e => {
    const { todo } = { ...this.state };
    todo[name] = e.target.value;
    this.setState({ todo });
  };

  // Handle dialog close
  handleClose = () => {
    this.setState({
      open: false,
      todo: { title: '', description: '' },
      inputError: false,
    });
  };

  // Handle dialog open
  handleOpen = () => {
    this.setState({ open: true });
  };

  // Handle create -button submit
  async handleSubmit(e, createtodo) {
    e.preventDefault();

    const { todo } = this.state;

    // Validate the input
    const parsedTitle = todo.title.replace(/\s/g, '');

    if (parsedTitle) {
      try {
        await createtodo({
          variables: {
            todo,
          },
        });
        // If todo succesfully created, close the dialog
        this.handleClose();
      } catch (error) {
        logger(error);
      }
    } else {
      this.setState({ inputError: true });
    }
  }

  render() {
    const { open, todo, inputError } = this.state;
    return (
      <Mutation mutation={CREATETODO} refetchQueries={['allTodos']}>
        {(createtodo, { loading, error }) => (
          <div>
            <Tooltip title="Add new Todo" placement="right">
              <Fab color="primary" style={styles.fab} onClick={this.handleOpen}>
                <AddIcon />
              </Fab>
            </Tooltip>
            <Dialog
              fullWidth
              open={open}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              disableRestoreFocus
              PaperProps={{ style: styles.paper }}
            >
              <form
                autoComplete="off"
                onSubmit={async e => this.handleSubmit(e, createtodo)}
              >
                <DialogTitle id="alert-dialog-title">
                  Create new todo:
                </DialogTitle>
                <DialogContent>
                  <TextField
                    required
                    error={inputError}
                    autoFocus
                    id="title"
                    label="Title"
                    value={todo.title}
                    onChange={this.handleChange('title')}
                  />
                  <br />
                  <br />
                  <br />
                  <TextField
                    id="description"
                    label="Description"
                    multiline
                    rows="4"
                    variant="outlined"
                    value={todo.description}
                    onChange={this.handleChange('description')}
                  />
                  <br />
                  <br />
                </DialogContent>
                <DialogActions>
                  <Button
                    variant="outlined"
                    value="submit"
                    type="submit"
                    color="primary"
                  >
                    Create
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

export default CreateTodo;
