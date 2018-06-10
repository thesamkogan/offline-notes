import React from 'react'
import {connect} from 'react-redux'
import Paper from '@material-ui/core/Paper';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField'

import {updateNote} from '../store/strnote'
// import EditModalWrapped from './editModal'
import {Modal} from 'react-materialize'


/**
 * COMPONENT
 */
export class NoteThumb extends React.Component{
  constructor(props){
  super(props)
  this.state = {edit: false, open: false}
  this.handleChange = this.handleChange.bind(this)
  this.handleClick = this.handleClick.bind(this)
  this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete() {
    alert('You clicked the delete icon.'); // eslint-disable-line no-alert
  }

  handleClick() {
    event.preventDefault();
    console.log('event, ', this.state)
    this.setState({
      edit: true
    })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
  const { note, shares, readonly } = this.props

    return (
      <Paper
      onClick={this.handleClick}
      style={{maxHeight: 300, minWidth: 275, marginBottom: 10, marginRight: 10}} className="card" elevation={6} key={ note.id }>
          <CardContent>
            <Typography
                style={{marginBottom: 4,
                fontSize: 14}}className="title" color="textSecondary">
              A note by {note.user.email}
            </Typography>
              <Typography
                style={{marginBottom: 16,
                fontSize: 14}}className="title" color="textSecondary">
              created: {note.createdAt.slice(0, 10)}
              </Typography>


            <Typography variant="title" gutterBottom>
              {note.content}
            </Typography>

          </CardContent>
          {!readonly &&

            <Modal
  header="Modal Header"
  bottomSheet
  fixedFooter
  trigger={<Button>MODAL BUTTOM SHEET STYLE</Button>}>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
            </Modal>
          }
          <Chip

        label="add collaborator"
        onClick={this.handleClick}
        onDelete={this.handleDelete}
        deleteIcon = {<AddIcon />}
        className="chip"
      />
      { note.shares && note.shares.map( share =>
        (<Chip
        key={share.id}
        label={share.user.email}
        onClick={this.handleClick}
        onDelete={this.handleDelete}
        className="chip"
      />))}
      </Paper>
  )
  }
}


// /**
//  * CONTAINER
// //  */
const mapDispatch = dispatch => {
  return {
    loadInitialData(id, note) {
      dispatch(updateNote(id, note))
    }
  }
}


export default connect(mapDispatch)(NoteThumb)
