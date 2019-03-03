// Import modules
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import LoaderHandler from '../utils/LoaderHandler';
import ErrorHandler from '../utils/ErrorHandler';
import logger from '../utils/logger';

// updatetodo mutation
// Send: new_todo
// Done: refetchQueries={['allTodos']}
const UPDATETODO = gql`
  mutation UpdateTodo($todo: UpdateTodoInput!) {
    updateTodo(todo: $todo)
  }
`;

// Styles
const styles = {
  spanEdit: {
    flex: 1,
    color: '#FFAB00',
    margin: 5,
    cursor: 'pointer',
  },
};

// Updatetodo component
class UpdateTodo extends Component {
  constructor(props) {
    super(props);

    const { item } = this.props;

    // If the selected todo has content, display it. Else show empty string
    this.state = {
      open: false,
      todo: {
        _id: item._id || '',
        title: item.title || '',
        description: item.description || '',
        completed: item.completed || false,
      },
      inputError: false,
    };
  }

  componentDidUpdate(prevProps) {
    const { item } = this.props;
    // only update chart if the data has changed
    if (prevProps.item !== item) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        todo: {
          _id: item._id || '',
          title: item.title || '',
          description: item.description || '',
          completed: item.completed || false,
        },
      });
    }
  }

  // Handle input changes
  handleChange = name => e => {
    const { todo } = { ...this.state };
    if (e.target.value === 'completed') {
      todo[name] = e.target.checked;
    } else {
      todo[name] = e.target.value;
    }
    this.setState({ todo });
  };

  // Handle dialog close
  handleClose = () => {
    const { item } = this.props;

    this.setState({
      open: false,
      todo: {
        _id: item._id || '',
        title: item.title || '',
        description: item.description || '',
        completed: item.completed || false,
      },
      inputError: false,
    });
  };

  // Handle dialog open
  handleOpen = () => {
    this.setState({ open: true });
  };

  // Handle update -button submit
  async handleSubmit(e, updatetodo) {
    e.preventDefault();

    const { todo } = this.state;

    // Validate the input
    const parsedTitle = todo.title.replace(/\s/g, '');

    if (parsedTitle) {
      try {
        await updatetodo({
          variables: {
            todo,
          },
        });
        // If update was successful, close the dialog
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
      <Mutation mutation={UPDATETODO} refetchQueries={['allTodos']}>
        {(updatetodo, { loading, error }) => (
          <div style={{ display: 'flex' }}>
            <Tooltip title="Edit" placement="left">
              <span
                style={styles.spanEdit}
                role="button"
                tabIndex={0}
                onClick={() => this.handleOpen()}
                onKeyUp={() => this.handleOpen()}
              >
                <EditIcon />
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
                onSubmit={async e => this.handleSubmit(e, updatetodo)}
              >
                <DialogTitle id="alert-dialog-title">Update todo:</DialogTitle>
                <DialogContent>
                  <TextField
                    label="Title"
                    name="title"
                    autoFocus
                    error={inputError}
                    required
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
                  <span>Completed:</span>
                  <Checkbox
                    checked={todo.completed}
                    onChange={this.handleChange('completed')}
                    value="completed"
                    color="primary"
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
UpdateTodo.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default UpdateTodo;
