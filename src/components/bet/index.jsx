import Card from 'components/global/card';
import { SocketContext } from 'context/SocketContext';
import React, { useContext, useEffect, useState } from 'react';
import style from './bet.module.scss';
export default function Bet() {
  const [bet, setBet] = useState(0);
  const [action, setAction] = useState('bet');
  const { socket, countdown, player } = useContext(SocketContext);

  const handleAction = () => {
    if (parseInt(bet) === NaN) {
      setBet(0);
      return;
    }

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
    setBet(0);
  };
  const handleBet = (e) => {
    if (e.target.innerText === '+100') {
      setBet(parseInt(bet || 0) + 100);
    }
    if (e.target.innerText === '1/2') {
      setBet((player.balance / 2).toFixed(0));
    }
    if (e.target.innerText === '2x') {
      setBet(bet * 2 <= player.balance ? bet * 2 : player.balance);
    }
    if (e.target.innerText === 'Max') {
      setBet(player.balance.toFixed(0));
    }
  };
  useEffect(() => {
    if (action === 'withdraw' && countdown === 9) {
      setAction('bet');
    }
  }, [countdown, action]);
  const isDisabled = () => {
    return (
      (!!countdown && action === 'withdraw') ||
      (!!!countdown && action === 'bet') ||
      bet > player.balance ||
      (player.balance <= 0 && action === 'bet') ||
      (bet === 0 && action === 'bet')
    );
  };
  useEffect(() => {}, [countdown]);
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
            <button className={style.bet} onClick={handleBet}>
              +100
            </button>
            <button className={style.bet} onClick={handleBet}>
              1/2
            </button>
            <button className={style.bet} onClick={handleBet}>
              2x
            </button>
            <button className={style.bet} onClick={handleBet}>
              Max
            </button>
          </div>
        </div>
      </div>
      <button
        className={style.btn_action}
        onClick={handleAction}
        disabled={isDisabled()}
      >
        {action}
      </button>
    </Card>
  );
}
