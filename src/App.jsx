import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const App = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io(process.env.REACT_APP_API_URL));
  }, [setSocket]);

  useEffect(
    () => () => {
      if (socket !== null) {
        socket.removeAllListeners();
        socket.close();
      }
    },
    [socket],
  );

  if (!socket) {
    return <div>Loading...</div>;
  }

  return <div>test</div>;
};

export default App;
