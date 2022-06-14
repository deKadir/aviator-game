import Bet from 'components/bet';
import Chart from 'components/chart';
import React, { useEffect } from 'react';
import style from './game.module.scss';
import History from 'components/history';
export default function Game() {
  return (
    <div className={style.container}>
      <Chart />
      <History />
      <Bet />
    </div>
  );
}
