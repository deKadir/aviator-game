import { createContext, useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

export const SocketContext = createContext();

const socket = socketIOClient('https://sleepy-bayou-78676.herokuapp.com/');
const SocketContextProvider = (props) => {
  const [countdown, setCountdown] = useState(0);
  const [player, setPlayer] = useState({ nickname: '', balance: 0 });
  useEffect(() => {
    socket.on('gameStatus', (s) => {
      setCountdown(s.countdown);
    });
  }, []);
  const data = {
    socket,
    countdown,
    player,
    setPlayer,
  };
  return <SocketContext.Provider value={data} {...props} />;
};

export default SocketContextProvider;
