import Card from 'components/global/card';
import { SocketContext } from 'context/SocketContext';
import React, { useContext, useEffect, useState } from 'react';
import style from './bets.module.scss';
import { getAvatar } from './../../helpers/user/index';
export default function Bets() {
  const { socket } = useContext(SocketContext);
  const [bets, setBets] = useState([]);
  useEffect(() => {
    socket.on('bets', (b) => {
      setBets(b);
    });
  }, []);
  return (
    <Card className={style.container}>
      <h2 className={style.title}>Bets</h2>
      <table className={style.table}>
        <th>Avatar</th>
        <th>Nickname</th>
        <th>bet</th>
        <th>X</th>
        <th>Win</th>
        {bets.map((bet, key) => {
          const avatar = getAvatar(bet.socketId);
          return (
            <tr
              className={style.table_row}
              align="center"
              key={key}
              style={{ color: bet.status ? 'green' : 'white' }}
            >
              <td className={style.table_avatar}>
                <img src={avatar} alt="" />
              </td>
              <td className={style.table_nickname}>{bet.nickname}</td>
              <td className={style.table_amount}>
                {parseInt(bet.amount).toFixed(2)}
              </td>
              <td className={style.table_amount}>
                {bet.withdraw !== 0 && bet.withdraw.toFixed(2)}
              </td>
              <td className={style.table_amount}>
                {bet.withdraw !== 0 && (bet.withdraw * bet.amount).toFixed(2)}
              </td>
            </tr>
          );
        })}
      </table>
    </Card>
  );
}
