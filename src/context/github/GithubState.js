import React, { userReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';

import {
  SEARCH_USERS,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
  SET_LOADING,
} from '../types'

const GithubState = props => {
  // initalize global state for github related
  const initailState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  }

  //useReducer to dispatch <...>type to <...>reducer 
  const [state, dispatch] = useReducer(GithubReducer, initialState)

  // Seach Users

  // Get User

  // Get Repos

  // Clear Users

  // Set Loading

  return <GithubContext.Provider
    value={{
      users: state.users,
      user: state.user,
      repos: state.repos,
      loading: state.loading
    }}
  >
    {props.children}
  </GithubContext.Provider>
}

export default GithubState;