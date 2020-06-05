import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const App = () => {
  const [socket, setSocket] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    const socket = io(process.env.REACT_APP_API_URL);
    socket.on('connect', () => {
      setSocketConnected(socket.connected);
    });
    // TODO: implement socket events handlers here
    setSocket(socket);
    return () => {
      socket.removeAllListeners();
      socket.close();
    };
  }, [setSocketConnected, setSocket]);

  if (!socket || !socketConnected) {
    return <div>Loading...</div>;
  }

  return <div>Socket connected!</div>;
};

export default App;
