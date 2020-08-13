import React, { Fragment, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import axios from 'axios';


import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';

import './App.css';

const App = () => {
  /* ===== REFACTOR =========
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null
  }
  */

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  /**
   * @desc endpiont at /search/users?q=${text}
   * @request-> text ; search 'text' submit call query to github api 
   * @response-> res.data.items
   */
  const searchUsers = async (text) => {
    // load spinner
    setLoading(true);

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    // this.setState({ users: res.data.items, loading: false })
    setUsers(res.data.items);
    setLoading(false);
  }

  /**
   * Get a user
   * @desc endpiont at /${username}
   * @request-> username 
   * @response-> res.data --object of user{}
   */
  const getUser = async (username) => {
    setLoading(true);

    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    // this.setState({ user: res.data, loading: false })
    setUser(res.data);
    setLoading(false);
  }

  /**
   * Get a user repos
   * @desc endpiont at /${username}/repos
   * @request-> username 
   * @response-> res.data 
   */
  const getUserRepos = async (username) => {
    setLoading(true);

    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    // this.setState({ repos: res.data, loading: false })
    setRepos(res.data);
    setLoading(false);
  }

  /**
   * @desc call from onClick btn in Search component
   */
  // clearUsers = () => this.setState({ users: [], loading: false })
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  }

  const showAlert = (msg, type) => {
    // this.setState({ alert: { msg, type } });
    setAlert({ msg, type });

    // Alert will disappear after 5s
    // setTimeout(() => this.setState({ alert: null }), 5000)
    setTimeout(() => setAlert(null), 5000)
  }

  return (
    <BrowserRouter>
      <div className='App'>
        <Navbar title='Github Finder' icon='fab fa-github' />
        <div className='container'>
          <Alert alert={alert} />
          <Switch>
            <Route
              exact path='/' render={props => (
                <Fragment>
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClearBtn={users.length > 0 ? true : false}
                    showAlert={showAlert}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              )}
            />
            <Route exact path='/about' component={About} />
            <Route
              exact path='/user/:login'
              render={props => (
                <User
                  {...props}
                  getUser={getUser}
                  getUserRepos={getUserRepos}
                  user={user}
                  repos={repos}
                  loading={loading}
                />
              )} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}


export default App;
