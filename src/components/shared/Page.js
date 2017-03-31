import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './Page.styl';


class Page extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className={styles.container}>
        {this.props.error && <div className={styles.error}>{this.props.error}</div>}
        {children}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.error,
});


export default connect(mapStateToProps)(Page);
