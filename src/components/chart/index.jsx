import Card from 'components/global/card';
import { SocketContext } from 'context/SocketContext';
import React, { useState, useEffect, useContext } from 'react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import style from './chart.module.scss';
const DATA = [
  {
    uv: 1,
  },
];
export default function Chart() {
  const [data, setData] = useState(DATA);
  const { socket, countdown } = useContext(SocketContext);
  useEffect(() => {
    socket.on('chart', (d) => {
      setData(d);
    });
  }, []);
  return (
    <Card className={style.container}>
      <h2 className={style.countdown}>{countdown}</h2>
      <h1
        className={style.value}
        style={{
          color: countdown ? 'red' : 'green',
        }}
      >{`${data[data.length - 1].uv.toFixed(2)}x`}</h1>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 20,
            right: 40,
            left: 0,
            bottom: 50,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis domain={[1, '']} tick={false} />
          <Area
            type="monotone"
            dataKey="uv"
            isAnimationActive={false}
            stroke="#ff8311"
            fill="#ff8311"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}
