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

// Create todo mutation
// Send: content
// Done: refetchQueries={['allTodos']}
const CREATETODO = gql`
  mutation CreateTodo($content: String!) {
    createTodo(content: $content) {
      content
    }
  }
`;

// CreateTodo component
class CreateTodo extends Component {
  state = {
    open: false,
    content: '',
  };

  // Handle input changes
  handleChange = name => e => {
    this.setState({ [name]: e.target.value });
  };

  // Handle dialog close
  handleClose = () => {
    this.setState({ open: false, content: '' });
  };

  // Handle dialog open
  handleOpen = () => {
    this.setState({ open: true });
  };

  // Handle create -button submit
  async handleSubmit(e, createtodo) {
    e.preventDefault();

    const { content } = this.state;

    try {
      await createtodo({
        variables: {
          content,
        },
      });
      // If todo succesfully created, close the dialog
      this.handleClose();
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { open, content } = this.state;
    return (
      <Mutation mutation={CREATETODO} refetchQueries={['allTodos']}>
        {(createtodo, { loading, error }) => (
          <div>
            <Tooltip title="Add new Todo" placement="right">
              <Fab
                color="primary"
                style={{ margin: 8 }}
                onClick={this.handleOpen}
              >
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
              PaperProps={{ style: { minWidth: 260 } }}
            >
              <form
                autoComplete="off"
                onSubmit={async e => this.handleSubmit(e, createtodo)}
              >
                <DialogTitle id="alert-dialog-title">
                  Create new todo
                </DialogTitle>
                <DialogContent>
                  <TextField
                    required
                    autoFocus
                    id="content"
                    label="Content"
                    value={content}
                    onChange={this.handleChange('content')}
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
            {error && <ErrorHandler message={error.toString()} />}
          </div>
        )}
      </Mutation>
    );
  }
}

export default CreateTodo;
