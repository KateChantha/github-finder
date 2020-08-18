import React, { useReducer } from 'react';
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
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  }

  //useReducer to dispatch <...>type to <...>reducer 
  const [state, dispatch] = useReducer(GithubReducer, initialState)


  /** ======================================
                  Seach Users
      =======================================
   * @desc endpiont at /search/users?q=${text}
   * @request-> text ; search 'text' submit call query to github api 
   * @response-> res.data.items
   */
  const searchUsers = async (text) => {
    // load spinner
    setLoading();

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    //REF-1: this.setState({ users: res.data.items, loading: false })
    //REF-2: setUsers(res.data.items);

    // see reference in githubReducer
    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items
    });
  }


  // Get User

  // Get Repos

  // Clear Users

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });


  return <GithubContext.Provider
    value={{
      users: state.users,
      user: state.user,
      repos: state.repos,
      loading: state.loading,
      searchUsers
    }}
  >
    {props.children}
  </GithubContext.Provider>
}

export default GithubState;