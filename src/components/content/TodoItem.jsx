// Import modules
import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';
import UpdateTodo from './UpdateTodoDialog';
import DeleteTodo from './DeleteTodoDialog';

// Styles
const styles = {
  paper: {
    display: 'flex',
    flex: 1,
    maxWidth: 300,
    margin: 'auto',
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

// Single TodoItem component. This can be a pure component
export const TodoItem = props => {
  const { item } = props;
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
};

// Define proptypes
TodoItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
};

export default TodoItem;
