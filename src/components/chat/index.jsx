import Card from 'components/global/card';
import { SocketContext } from 'context/SocketContext';
import React, { useContext, useEffect, useRef, useState } from 'react';
import style from './chat.module.scss';
export default function Chat() {
  const [messages, setMessages] = useState([]);
  const { socket } = useContext(SocketContext);
  const [message, setMessage] = useState('');
  const ref = useRef(null);
  useEffect(() => {
    socket.on('message', (msg) => {
      setMessages([...messages, msg]);
    });
    ref?.current.scrollIntoView();
  }, [messages]);
  useEffect(() => {
    const submitMessage = (k) => {
      if (k.code === 'Enter' && message.length) {
        socket.emit('sendMessage', message);
        setMessage('');
      }
    };
    window.addEventListener('keypress', submitMessage);
    return () => window.removeEventListener('keypress', submitMessage);
  }, [message]);
  return (
    <>
      <Card className={style.container}>
        <h2 className={style.title}>Chat</h2>
        <div className={style.messages}>
          {messages.map((msg, k) => {
            return (
              <div key={k} className={style.message}>
                <p>{msg.nickname}:</p>
                <span>{msg.message}</span>
              </div>
            );
          })}
          <div ref={ref}></div>
        </div>
        <input
          type="text"
          className={style.messageInput}
          placeholder="Start Typing"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
      </Card>
    </>
  );
}
