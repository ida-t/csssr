import React, { Component, PropTypes } from 'react';

import cn from 'classnames';

import styles from './Home.styl';


export default class Pagination extends Component {

  static propTypes = {
    changePage: PropTypes.func.isRequired,

    page: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    items: PropTypes.array,
  }

  isNextActive(items, count) {
    return items && items.length && items.length === count;
  }

  handleBack = (page) => {
    if (page !== 1) {
      this.props.changePage(page - 1);
    }
  }

  handleNext = (items, page, count) => {
    if (this.isNextActive(items, count)) {
      this.props.changePage(page + 1);
    }
  }

  render() {
    const { page, items, count } = this.props;

    const backCn = cn(styles.back, { [styles.active]: page > 1 });
    const nextCn = cn(styles.next, { [styles.active]: this.isNextActive(items, count) });

    return (
      <div className={styles.paginationContainer}>
        <div className={backCn} onClick={() => this.handleBack(page)}>Назад</div>
        <div className={nextCn} onClick={() => this.handleNext(items, page, count)}>Вперед</div>
      </div>
    );
  }
}
