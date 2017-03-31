import React, { Component, PropTypes } from 'react';

import cn from 'classnames';

import styles from './Home.styl';


const counts = [10, 30, 50, 100];


export default class Counts extends Component {

  static propTypes = {
    changeCount: PropTypes.func.isRequired,

    count: PropTypes.number.isRequired,
  }


  render() {
    const { changeCount, count } = this.props;

    return (
      <div className={styles.countContainer}>
        {counts.map(item =>
          <div
            onClick={() => changeCount(item)}
            className={cn(styles.count, { [styles.active]: count === item })}
            key={item}
          >
            {item}
          </div>
        )}
      </div>
    );
  }
}
