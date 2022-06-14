import Bets from 'components/bets';
import Onlines from 'components/onlines';

import style from './sidebar.module.scss';
export default function Sidebar() {
  return (
    <div className={style.container}>
      <Bets />
      <Onlines />
    </div>
  );
}
