import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import axios from 'axios';


import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';

import './App.css';

class App extends React.Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null
  }

  // ======= fetch initail users when page is loaded ========
  // async componentDidMount() {
  //   this.setState({ loading: true })
  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

  //   this.setState({ users: res.data, loading: false })
  // }

  /**
   * @desc endpiont at /search/users?q=${text}
   * @request-> text ; search 'text' submit call query to github api 
   * @response-> res.data.items
   */
  searchUsers = async (text) => {
    // load spinner
    this.setState({ loading: true })

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ users: res.data.items, loading: false })
  }

  /**
   * Get a user
   * @desc endpiont at /${username}
   * @request-> username 
   * @response-> res.data --object of user{}
   */
  getUser = async (username) => {
    // load spinner
    this.setState({ loading: true })

    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ user: res.data, loading: false })
  }

  /**
   * @desc call from onClick btn in Search component
   */
  clearUsers = () => this.setState({ users: [], loading: false })

  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });

    // Alert will disappear after 5s
    setTimeout(() => this.setState({ alert: null }), 5000)
  }

  render() {
    const { users, user, loading, alert } = this.state
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
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClearBtn={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
              <Route
                exact path='/user/:login'
                render={props => (
                  <User {...props} getUser={this.getUser} user={user} loading={loading} />
                )} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}


export default App;
