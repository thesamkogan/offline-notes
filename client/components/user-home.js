import React from 'react'
// import PropTypes from 'prop-types'
import {
  connect
} from 'react-redux'
// import { Draft } from './draft'
import { withStyles } from '@material-ui/core/styles';
import {
  fetchNotes,
  fetchSharedNotes
} from '../store';
import NoteThumb from './NoteThumb'
import EditModalWrapped from './editModal'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import { Avatar } from '@material-ui/core';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
});
/**
 * COMPONENT
 */
export class UserHome extends React.Component {

    componentDidMount() {
      this.props.loadInitialData()
    }

    render() {
    let { note, share } = this.props

      return (
        <div className = "card-main" >
        {
          note.length && note.map(
            notes => ( <NoteThumb key = {notes.id} note = {notes} readonly={false} /> )
            )
          }
          {
          share.length && share.map(
              shares => ( <NoteThumb key = {shares.id} note = {shares.note} shares={shares} readonly={shares.readonly} /> )
              )
          }


        </div>
        )
      }
    }

    /**
     * CONTAINER
     */
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


    // export default connect(mapState, mapDispatch).withStyles(styles)(UserHome);
    const UserHomeStyle =  withStyles(styles)(UserHome);
    export default connect(mapState, mapDispatch)(UserHomeStyle)

