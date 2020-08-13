import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Search = ({ searchUsers, showClearBtn, clearUsers, showAlert }) => {
  const [text, setText] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (text === '') {
      // call setAlert in parent--App.js and pass in class='light'
      showAlert('Please enter valid user name', 'light')
    } else {
      // call searchUser in parent--App.js
      searchUsers(text);
      // clear search feild after submit
      setText('');
    }

  }

  const onChange = (e) => setText(e.target.value)


  return (
    <div>
      <form onSubmit={onSubmit} className='form'>
        <input
          type='text'
          value={text}
          onChange={onChange}
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

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  showClearBtn: PropTypes.bool.isRequired,
  showAlert: PropTypes.func.isRequired
}

export default Search;