import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import cn from 'classnames';

import { fetchIssue } from '../../sagas/gitHubSagas';

import styles from './IssuePage.styl';

const mapStateToProps = state => ({
  issue: state.issue,
});

const mapDispatchToProps = dispatch =>
   bindActionCreators({ fetchIssue }, dispatch);


class IssuePage extends Component {

  static propTypes = {
    fetchIssue: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.fetchIssue(this.props.params);
  }

  render() {
    if (!this.props.issue.item && !this.props.issue.loading) {
      return null;
    }

    if (this.props.issue.loading) {
      return <div>...loading...</div>;
    }

    const { title, number, html_url, user, state, body } = this.props.issue.item;
    return (
      <div className={styles.container}>
        <a href={html_url} target="_blank" className={styles.title}>#{number} {title}</a>
        <a href={user.html_url} target="_blank" className={styles.user}>
          <img src={user.avatar_url} alt={user.login} className={styles.img} />
          <div>{user.login}</div>
        </a>
        <div className={cn(styles.state, styles[state])}>{state}</div>
        <div className={styles.body}>{body}</div>
      </div>
    );
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(IssuePage));
