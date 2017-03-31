import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


import { changeCount, changePage } from '../../sagas/gitHubSagas';


import Issue from './Issue';
import Pagination from './Pagination';
import Counts from './Counts';

import styles from './Home.styl';

const mapStateToProps = state => ({
  issues: state.issues,
  form: state.form,
  visualization: state.visualization
});


const mapDispatchToProps = dispatch =>
   bindActionCreators({ changeCount, changePage }, dispatch);


class ListIssues extends Component {

  static propTypes = {
    changeCount: PropTypes.func.isRequired,
    changePage: PropTypes.func.isRequired,

    issues: PropTypes.object,
    form: PropTypes.object,
    visualization: PropTypes.object,
  }

  render() {
    const { items } = this.props.issues;

    if (!items) {
      return null;
    }

    const { owner, repo } = this.props.form;
    const { page, count } = this.props.visualization;

    return (
      <div>
        <Pagination page={page} items={items} changePage={this.props.changePage} count={count} />
        <div className={styles.countContainer}>
          Выводить по: <Counts count={count} changeCount={this.props.changeCount} />
        </div>
        {items.map(item =>
          <Issue key={item.id} issue={item} owner={owner} repo={repo} />
        )}
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ListIssues);
