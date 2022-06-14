import Card from 'components/global/card';
import { SocketContext } from 'context/SocketContext';
import React, { useContext, useEffect, useState } from 'react';
import style from './history.module.scss';
export default function History() {
  const [results, setResults] = useState([]);
  const { socket } = useContext(SocketContext);
  useEffect(() => {
    socket.on('gameHistory', (r) => setResults(r));
  }, [results]);
  return (
    <Card className={style.container}>
      <div className={style.results}>
        {results.map((r, k) => {
          return (
            <div
              className={style.result}
              key={k}
              style={{ color: r > 2 ? 'green' : 'red' }}
            >
              {`${r.toFixed(2)}x`}{' '}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
