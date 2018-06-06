import React from 'react'
import {connect} from 'react-redux'
import NoteThumb from './NoteThumb'

/**
 * COMPONENT
 */
export const NoteList = (props) => {
  const {notes} = props

  return (
    <div>
    {notes && notes.map(note => (
      <NoteThumb key={note.id} note={note} />
    ))}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    notes: state.user.email
  }
}

export default connect(mapState)(NoteList)
