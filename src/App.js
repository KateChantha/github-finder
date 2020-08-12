import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';

import './App.css';

class App extends React.Component {
  state = {
    users: [],
    loading: false
  }

  static propTypes = {
    searchUsers: PropTypes.func.isRequired
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

  render() {
    return (
      <div className='App'>
        <Navbar title='Github Finder' icon='fab fa-github' />
        <div className='container'>
          <Search searchUsers={this.searchUsers} />
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}


export default App;
