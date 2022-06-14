import { SocketContext } from 'context/SocketContext';
import React, { useContext, useState } from 'react';
import style from './login.module.scss';
export default function Login() {
  const [nickname, setNick] = useState('');
  const [auth, setAuth] = useState(false);
  const { socket } = useContext(SocketContext);
  const handleSubmit = () => {
    if (nickname) {
      setTimeout(() => {
        setAuth(true);
        socket.emit('join', {
          nickname,
          socketId: socket.id,
        });
      }, 300);
    }
  };
  if (auth) return null;
  return (
    <div className={style.container}>
      <div className={style.content}>
        <p>Enter your nickname</p>
        <input
          type="text"
          placeholder="Nickname"
          value={nickname}
          onChange={(e) => setNick(e.target.value)}
        />
        <button onClick={handleSubmit}>Continue</button>
      </div>
    </div>
  );
}
