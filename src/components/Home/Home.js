import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchIssues } from '../../sagas/gitHubSagas';

import UserForm from './UserForm';
import IssuesList from './IssuesList';

import styles from './Home.styl';

const mapStateToProps = state => ({
  issues: state.issues,
  form: state.form,
  visualization: state.visualization
});


const mapDispatchToProps = dispatch =>
   bindActionCreators({ fetchIssues }, dispatch);


class Home extends Component {

  static propTypes = {
    fetchIssues: PropTypes.func.isRequired,

    issues: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visualization !== this.props.visualization) {
      const { page, count } = nextProps.visualization;
      const { owner, repo } = this.props.form;
      this.props.fetchIssues({ owner, repo, page, count });
    }
  }


  render() {
    const { items, loaded, loading } = this.props.issues;
    const { owner } = this.props.form;

    return (
      <div className={styles.container}>
        <div className={styles.column}>
          <UserForm
            fetchIssues={this.props.fetchIssues}
            loading={loading}
            owner={owner}
            visualization={this.props.visualization}
          />
        </div>
        <div className={styles.column}>
          {loaded && !items.length && <div>Ничего не найдено :(</div>}
          {loaded && items && <IssuesList />}
        </div>

      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);
