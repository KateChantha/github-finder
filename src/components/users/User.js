import React from 'react';

// Class-base to access componentDidMount
class User extends React.Component {
  componentDidMount() {
    /* REFERENCE FORM App.js ******
    <Route 
      exact path='/user/:login' <==== params.login =====
      render={props => (
      <User {...props} getUser={this.getUser} user={user} loading={loading} />
    )} /> 
    */
    this.props.getUser(this.props.match.params.login);
  }
  render() {
    const {
      name,
      avatar_url,
      location,
      bio,
      login,
      blog,
      html_url,
      followers,
      following,
      public_repos,
      public_gist,
      hireable
    } = this.props.user;

    const { loading } = this.props;

    return (
      <div>
        {this.props.user.name}
      </div>
    )
  }
}

export default User;