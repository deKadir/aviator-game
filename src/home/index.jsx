import Chat from 'components/chat';
import Game from 'components/game';
import Sidebar from 'components/sidebar';
import style from './home.module.scss';
function Home() {
  return (
    <div className={style.container}>
      <Sidebar />
      <Game />
      <Chat />
    </div>
  );
}

export default Home;
