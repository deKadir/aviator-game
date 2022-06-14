import React from 'react';
import styles from './card.module.scss';
import classnames from 'classnames';
export default function Card(props) {
  return (
    <div {...props} className={classnames(styles.card, props.className)} />
  );
}
