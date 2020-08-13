import React from 'react';
import PropTypes from 'prop-types';

class Search extends React.Component {
  // attach state to the input
  // from input will be component level state
  state = {
    text: ''
  }

  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClearBtn: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.text === '') {
      // call setAlert in parent--App.js and pass in class='light'
      this.props.setAlert('Please enter valid user name', 'light')
    } else {
      // call searchUser in parent--App.js
      this.props.searchUsers(this.state.text);
      // clear search feild after submit
      this.setState({ text: '' });
    }

  }

  onChange = (e) => {
    // this.setState({ text: e.target.value })
    // this.setState({ email: e.target.value })
    // ^^^^ dynamic key pair ^^^^
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { showClearBtn, clearUsers } = this.props
    return (
      <div>
        <form onSubmit={this.onSubmit} className='form'>
          <input
            type='text'
            value={this.state.text}
            onChange={this.onChange}
            name='text'
            placeholder='Search Users...' />
          <input
            type='submit'
            value='Search'
            className='btn btn-dark btn-block'
          />
        </form>
        {showClearBtn && <button className='btn btn-light btn-block' onClick={clearUsers} >Clear</button>}
      </div>
    )
  }
}

export default Search;