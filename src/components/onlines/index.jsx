import Card from 'components/global/card';
import { SocketContext } from 'context/SocketContext';
import { getAvatar } from 'helpers/user';
import React, { useContext, useEffect, useState } from 'react';
import style from './onlines.module.scss';
export default function Onlines() {
  const { socket } = useContext(SocketContext);
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    socket.on('players', (p) => {
      setPlayers(p);
    });
  }, []);
  return (
    <Card>
      <div className={style.header}>
        <h2>Online Players</h2>
        <p>{players.length} playing</p>
      </div>
      <ul className={style.list}>
        {players.map((p, k) => {
          const avatar = getAvatar(p.socketId);
          return (
            <li key={k} className={style.list_item}>
              <img
                src={avatar}
                alt={p.nickname}
                className={style.list_avatar}
              />
              <p>{p.nickname}</p>
              <span>{parseInt(p?.balance).toFixed(2)}</span>
              <img
                src={require('assets/images/coin.png')}
                alt=""
                className={style.coin_img}
              />
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
