import Card from 'components/global/card';
import { SocketContext } from 'context/SocketContext';
import React, { useContext, useState } from 'react';
import style from './bet.module.scss';
export default function Bet() {
  const [bet, setBet] = useState(0);
  const [action, setAction] = useState('bet');
  const { socket, countdown } = useContext(SocketContext);

  const handleAction = () => {
    if (action === 'withdraw') {
      socket.emit('withdraw', {
        socketId: socket?.id,
      });
      setAction('bet');
    }
    if (action === 'bet') {
      socket.emit('bet', {
        bet,
        socketId: socket?.id,
      });
      setAction('withdraw');
    }
  };

  return (
    <Card className={style.container}>
      <div className={style.options}>
        <div className={style.action_container}>
          <input
            type="number"
            value={bet}
            onChange={(e) => setBet(e.target.value)}
            className={style.input}
          />
          <div className={style.buttons}>
            <button className={style.bet}>1$</button>
            <button className={style.bet}>2$</button>
            <button className={style.bet}>5$</button>
            <button className={style.bet}>10$</button>
          </div>
        </div>
      </div>
      <button
        className={style.btn_action}
        onClick={handleAction}
        disabled={
          (!!countdown && action === 'withdraw') ||
          (!!!countdown && action === 'bet')
        }
      >
        {action}
      </button>
    </Card>
  );
}
