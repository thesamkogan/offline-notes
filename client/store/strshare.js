import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_SHARES = 'GET_SHARES'
const REMOVE_SHARE = 'REMOVE_SHARE'
const ADD_SHARE = 'ADD_SHARE'

/**
 * INITIAL STATE
 */
const sharedNotes = {}

/**
 * ACTION CREATORS
 */
const getShares = shares => ({type: GET_SHARES, shares})
const removeShare = id => ({type: REMOVE_SHARE, id})
const addShare = share => ({type: ADD_SHARE, share})

/**
 * THUNK CREATORS
 */
export const fetchSharedNotes = () =>
  dispatch =>
    axios
      .get('/api/shares')
      .then(res => dispatch(getShares(res.data)))
      .catch(err => console.log(err))

export const removeShareFromNote = id =>
  dispatch =>
    axios
      .delete(`/shares`, id)
      .then(res => dispatch(removeShare(id)))
      .catch(err => console.error(err))

export const addAShare = share =>
  dispatch =>
    axios
      .post('/shares', share)
      .then(newShare => dispatch(addShare(newShare)))
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = sharedNotes, action) {
  switch (action.type) {
    case GET_SHARES:
      return action.shares
    case REMOVE_SHARE:
      return state.filter(share => share.id !== action.id)
    case ADD_SHARE:
      return [action.share, ...state]
    default:
      return state
  }
}
