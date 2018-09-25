import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';
import UpdateTodo from './UpdateTodoDialog';
import DeleteTodo from './DeleteTodoDialog';

const styles = {
  paper: {
    display: 'flex',
    flex: 1,
    maxWidth: 300,
    margin: '10px auto',
    textAlign: 'center',
  },
  p: {
    display: 'flex',
    flex: 5,
    textAlign: 'left',
    margin: 'auto',
    whiteSpace: 'pre',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  span: {
    flex: 1,
    padding: 10,
    cursor: 'pointer',
    whiteSpace: 'pre',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  div: {
    display: 'flex',
  },
};

class TodoItem extends Component {
  state = {};

  deleteItem = () => {
    console.log('Delete');
  };

  editItem = () => {
    console.log('Edit');
  };

  render() {
    const { item } = this.props;
    return (
      <Paper style={styles.paper}>
        <Tooltip title={item.content} placement="left">
          <p style={styles.p}>
            <span style={styles.span}>{item.content}</span>
          </p>
        </Tooltip>
        <div style={styles.div}>
          <UpdateTodo item={item} />
          <DeleteTodo item={item} />
        </div>
      </Paper>
    );
  }
}

TodoItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
};

export default TodoItem;
