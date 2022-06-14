import { createContext, useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

export const SocketContext = createContext();

const socket = socketIOClient('https://git.heroku.com/sleepy-bayou-78676.git');
const SocketContextProvider = (props) => {
  const [countdown, setCountdown] = useState(0);
  useEffect(() => {
    socket.on('gameStatus', (s) => {
      setCountdown(s.countdown);
    });
  }, []);
  const data = {
    socket,
    countdown,
  };
  return <SocketContext.Provider value={data} {...props} />;
};

export default SocketContextProvider;
