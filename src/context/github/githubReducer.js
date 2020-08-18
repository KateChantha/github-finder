import {
  SEARCH_USERS,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
  SET_LOADING,
} from '../types'

export default (state, action) => {
  switch (action.type) {
    case SEARCH_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      }
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      }

    // if nothing pass in, return as is state
    default:
      return state;
  }
}