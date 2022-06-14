import { SocketContext } from 'context/SocketContext';
import React, { useContext, useEffect } from 'react';
import style from './nav.module.scss';
export default function Nav() {
  const { socket, setPlayer, player } = useContext(SocketContext);
  useEffect(() => {
    socket.on('getPlayer', (res) => {
      setPlayer({ ...res });
    });
  }, [socket]);
  return (
    <div className={style.container}>
      <h1>{player?.nickname}</h1>
      <h2>Balance:{player?.balance?.toFixed(2)}</h2>
      <img src={require('assets/images/coin.png')} alt="" />
    </div>
  );
}
