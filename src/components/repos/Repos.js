import React from 'react';
import PropTypes from 'prop-types';
import RepoItem from './RepoItem';

/**
 * @param props - {repos} 
 */
const Repos = ({ repos }) => {
  console.log('In Repos-repos:', repos)
  // return (
  //   <div>THIS is Repos</div>
  // )
  return repos.map(repo => <RepoItem key={repo.id} repo={repo} />)
}

Repos.propTypes = {
  repos: PropTypes.array.isRequired
}

export default Repos;