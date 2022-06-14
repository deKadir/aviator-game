import './assets/styles/reset.scss';

import Home from 'home';
import Nav from 'components/nav';
import Login from 'components/login';
import SocketContextProvider from 'context/SocketContext';

function App() {
  return (
    <SocketContextProvider>
      <div style={{ backgroundColor: '#AFD8FF', height: '100vh' }}>
        <Nav />
        <Home />
        <Login />
      </div>
    </SocketContextProvider>
  );
}

export default App;
