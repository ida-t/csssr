import React, { Component, PropTypes } from 'react';

import styles from './UserForm.styl';


export default class UserForm extends Component {

  static propTypes = {
    fetchIssues: PropTypes.func.isRequired,

    loading: PropTypes.bool,
    visualization: PropTypes.object.isRequired,
  }

  state = {
    owner: '',
    repo: '',
  }

  render() {
    const { loading } = this.props;
    const { owner, repo } = this.state;
    const { page, count } = this.props.visualization;

    return (
      <div className={styles.container}>
        <input
          value={owner}
          onChange={evt => this.setState({ owner: evt.target.value })}
          className={styles.input}
          placeholder="Eneter user name"
        />
        <input
          value={repo}
          onChange={evt => this.setState({ repo: evt.target.value })}
          className={styles.input}
          placeholder="Eneter repo name"
        />
        { !loading && <button onClick={() => this.props.fetchIssues({ owner, repo, page, count })} className={styles.button}>Done</button> }
        {loading && <div className={styles.loading}>loading...</div>}
      </div>
    );
  }
}
