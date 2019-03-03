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
    flexDirection: 'column',
    flex: 1,
    maxWidth: 300,
    margin: 'auto',
    textAlign: 'center',
  },
  p: {
    display: 'flex',
    whiteSpace: 'pre',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginTop: 5,
    marginBottom: 5,
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
    margin: 'auto',
  },
  completed: {
    backgroundColor: '#C8E6C9',
  },
  uncompleted: {
    backgroundColor: '#ffcdd2',
  },
};

// Single TodoItem component. This can be a pure component
export const TodoItem = props => {
  const { item } = props;
  return (
    <Paper
      style={
        item.completed
          ? { ...styles.paper, ...styles.completed }
          : { ...styles.paper, ...styles.uncompleted }
      }
    >
      <Tooltip title={item.title} placement="left">
        <h4 style={styles.p}>
          <span style={styles.span}>{item.title}</span>
        </h4>
      </Tooltip>

      <p style={styles.p}>
        <span style={styles.span}>{item.description}</span>
      </p>

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
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default TodoItem;
