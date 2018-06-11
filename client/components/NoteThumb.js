import React, {Component} from 'react'
import {connect} from 'react-redux'
import Paper from '@material-ui/core/Paper';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
// import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField'
import { updateNote, addAShare } from '../store'
// import EditModalWrapped from './editModal'
import {Modal, Chip, Button, Input} from 'react-materialize'


/**
 * COMPONENT
 */
export class NoteThumb extends Component{
  constructor(){
  super()
  this.state = {edit: false, open: false}
  // this.handleSave = this.handleSave.bind(this)
  this.handleClick = this.handleClick.bind(this)
  this.handleDelete = this.handleDelete.bind(this)
  this.handleUpdateText = this.handleUpdateText.bind(this)

  }

  handleDelete() {
    alert('You clicked the delete icon.'); // eslint-disable-line no-alert
  }

  handleUpdateText(event) {
    event.preventDefault();
    this.setState({content: event.target.value})
    console.log(this.state)
  }

  handleClick() {
    event.preventDefault();
    console.log('event, ', this.state)
    this.setState({
      edit: true
    })
  }

  // handleSave = (e) => {
  //   event.preventDefault();
  //   console.log(e, this.state.content)
  //   console.log(this.props)
  //   this.props.updateNotes(e, {content: this.state.content})
  // };

  render() {
  const { note, shares, readonly, updateNotes, addShare } = this.props
    return (
      <Paper
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

          </CardContent>
            <Typography variant="title" gutterBottom style={{paddingBottom: 20, marginLeft: 20, marginRight: 20}}>
              {note.content}
            </Typography>

          {!readonly &&
            <Modal
style={{marginTop: 16}}
              bottomSheet
              fixedFooter
              actions={<Button
style={{align: 'left'}} onClick={ () => {
                console.log(this.state.content, note.id)
                updateNotes(note.id, this.state.content)} } waves="light" >Save
                       </Button>}
              trigger={<Button waves="light">Edit</Button>}>
              <Input onChange={this.handleUpdateText} type="textarea" s={6} validate value={this.state.title} defaultValue={note.content} />
              <Button
        label="add collaborator"
        onClick={() => {
          console.log('HELP')
          addShare({userId: 2, noteId: 1, readonly: false})}
        }
        onDelete={this.handleDelete}
        deleteIcon = {<AddIcon />}
        className="chip"
      >add collaborator
              </Button>
      { note.shares && note.shares.map( share =>
        (<Chip
        key={share.id}
        onClick={this.handleClick}
        onDelete={this.handleDelete}
        className="chip"
      >{share.user.email}
         </Chip>))}
            </Modal>
          }
      { note.shares && note.shares.map( share =>
        (<Chip
        key={share.id}
        onClick={this.handleClick}
        onDelete={this.handleDelete}
        className="chip"
      >{share.user.email}
         </Chip>))}
      </Paper>
  )
  }
}


// const mapState = state => state;

const mapDispatch = (dispatch) => {
  return {
  updateNotes: (id, note) => {
    dispatch(updateNote(id, note));
  },
  addShare: (share) => {
    dispatch(addAShare(share))
  }
  }
};

export default connect(null, mapDispatch)(NoteThumb)
