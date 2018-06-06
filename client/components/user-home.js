import React from 'react'
// import PropTypes from 'prop-types'
import {
  connect
} from 'react-redux'
// import { Draft } from './draft'
// import { withStyles } from '@material-ui/core/styles';
import {
  fetchNotes,
  fetchSharedNotes
} from '../store';
import {
  NoteThumb
}
from './NoteThumb'


// import fetchNotes from '../store/strnote'

// const styles = {
//   card: {
//     minWidth: 275,
//     maxWidth: 100
//   },
//   bullet: {
//     display: 'inline-block',
//     margin: '0 2px',
//     transform: 'scale(0.8)',
//   },
//   title: {
//     marginBottom: 16,
//     fontSize: 14,
//   },
//   pos: {
//     marginBottom: 12,
//   },
// };

/**
 * COMPONENT
 */
export class UserHome extends React.Component {
    constructor() {
      super()
    }

    componentDidMount() {
      this.props.loadInitialData()
    }

    render() {
    let { shares } = this.props


      return (
        <div className = "card-main" > {
          this.props.note.length && this.props.note.map(
            notes => ( <NoteThumb key = {notes.id} note = {notes} shares = {shares} /> )
            )
          }
          <ol>{
          shares &&
          <li>{this.props.shares}</li>
          }
          </ol>
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
      shares
    }) => ({
      note,
      shares,
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
    // export default withStyles(styles)(connect(mapState, mapDispatch)(UserHome));
    export default connect(mapState, mapDispatch)(UserHome)
