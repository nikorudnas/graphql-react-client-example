// Import modules
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import LoaderHandler from '../utils/LoaderHandler';
import ErrorHandler from '../utils/ErrorHandler';

// updatetodo mutation
// Send: todo_id, new_content
// Done: refetchQueries={['allTodos']}
const UPDATETODO = gql`
  mutation UpdateTodo($_id: ObjectID!, $content: String!) {
    updateTodo(_id: $_id, content: $content) {
      content
    }
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
      content: item.content ? item.content : '',
    };
  }

  // Handle input changes
  handleChange = name => e => {
    this.setState({ [name]: e.target.value });
  };

  // Handle dialog close
  handleClose = () => {
    const { item } = this.props;

    this.setState({ open: false, content: item.content ? item.content : '' });
  };

  // Handle dialog open
  handleOpen = () => {
    this.setState({ open: true });
  };

  // Handle update -button submit
  async handleSubmit(e, updatetodo) {
    e.preventDefault();

    const { content } = this.state;
    const { item } = this.props;

    try {
      await updatetodo({
        variables: {
          _id: item._id,
          content,
        },
      });
      // If update was successful, close the dialog
      this.handleClose();
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { open, content, inputError } = this.state;
    const { item } = this.props;
    return (
      <Mutation mutation={UPDATETODO} refetchQueries={['allTodos']}>
        {(updatetodo, { loading, error }) => (
          <div style={{ display: 'flex' }}>
            <Tooltip title="Edit" placement="top-end">
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
                <DialogTitle id="alert-dialog-title">Update todo</DialogTitle>
                <DialogContent>
                  <h4>{item._id}</h4>
                  <TextField
                    label="Content"
                    name="content"
                    autoFocus
                    error={inputError}
                    required
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
            {error && <ErrorHandler message={error.toString()} />}
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
    content: PropTypes.string.isRequired,
  }).isRequired,
};

export default UpdateTodo;
