import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import styles from './Issue.styl';


export default class Issue extends Component {

  static propTypes = {
    issue: PropTypes.object.isRequired,
    owner: PropTypes.string.isRequired,
    repo: PropTypes.string.isRequired,
  }


  render() {
    const { title, created_at, number, user } = this.props.issue;
    const { owner, repo } = this.props;

    return (
      <div className={styles.container}>
        <a href={user.html_url} target="_blank" className={styles.user}>
          <img src={user.avatar_url} alt={user.login} className={styles.img} />
          <div>{user.login}</div>
        </a>
        <Link to={`/repos/${owner}/${repo}/issues/${number}`} className={styles.issue}>
          <div>#{number} {title}</div>
          <div>{created_at.substr(0, 10)}</div>
        </Link>
      </div>
    );
  }
}
