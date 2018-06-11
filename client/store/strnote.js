import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_NOTES = 'GET_NOTES'
const REMOVE_NOTE = 'REMOVE_NOTE'
const EDIT_NOTE = 'EDIT_NOTE'
const ADD_NOTE = 'ADD_NOTE'

/**
 * INITIAL STATE
 */
const notes = {}

/**
 * ACTION CREATORS
 */
const getNotes = userNotes => ({type: GET_NOTES, userNotes})
const removeNote = id => ({type: REMOVE_NOTE, id})
const editNote = note => ({type: EDIT_NOTE, note})
const addNote = note => ({type: ADD_NOTE, note})

/**
 * THUNK CREATORS
 */
export const fetchNotes = () =>
  dispatch => {
    axios
      .get('/api/notes')
      .then(res => {
        dispatch(getNotes(res.data))})
      .catch(err => console.log(err))
      }

export const deleteNote = id =>
  dispatch =>
    axios
    .delete('/notes', id)
    .then(() => dispatch(removeNote(id)))
    .catch(err => console.log(err))


export const updateNote = (id, note) =>
  dispatch =>
    axios
      .put(`/api/notes/${id}`, note)
      .then(res => dispatch(editNote(res.data)))
      .catch(err => console.log(err))

export const addANote = note =>
  dispatch =>
    axios
      .post('/notes', note)
      .then(() => dispatch(addNote(note)))
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = notes, action) {
  switch (action.type) {
    case GET_NOTES:
      return action.userNotes
    case REMOVE_NOTE:
      return state.filter(note => note.id !== action.id)
    case EDIT_NOTE:
      return state.map(
        allNotes => (action.note.id === allNotes.id ? action.note : allNotes)
      );
    case ADD_NOTE:
      return [action.note, ... state]
    default:
      return state
  }
}
