import React from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {Modal} from 'react-materialize'
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Edit';

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  }
});

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

class EditModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
        open: false,
      };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { note, shares, readonly, classes } = this.props
    console.log('PROPS, ', this.props)
    return (
      <div>
      <Button onClick={this.handleOpen}>Open Modal</Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div
style={getModalStyle()} className="EditModal-paper-142"
          >
            <Typography variant="title" id="modal-title">
              {note.content}
            </Typography>
            <Typography variant="subheading" id="simple-modal-description">
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
            <EditModal />
          </div>
        </Modal>
      </div>
    )}
}

// We need an intermediary variable for handling the recursive nesting.
const EditModalWrapped = withStyles(styles)(EditModal);

const mapState = ({
  user,
  note,
  share
}) => ({
  note,
  share,
  isLoggedIn: !!user.id
});
const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(fetchSharedNotes())
      dispatch(fetchNotes())

    }
  }
}

export default connect(mapState)(EditModalWrapped);
