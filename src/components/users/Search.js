import React from 'react';

class Search extends React.Component {
  // attach state to the input
  // from input will be component level state
  state = {
    text: ''
  }

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.text)
  }

  onChange = (e) => {
    // this.setState({ text: e.target.value })
    // this.setState({ email: e.target.value })
    // ^^^^ dynamic key pair ^^^^
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
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
      </div>
    )
  }
}

export default Search;