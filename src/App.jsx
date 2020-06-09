import React, { useEffect, useState, useCallback } from 'react';
import io from 'socket.io-client';
import { Alert, ProgressBar } from 'react-bootstrap';

import Game from './components/Game';

const App = () => {
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(null);

  const [socket, setSocket] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const socket = io(process.env.REACT_APP_API_URL);
    socket.on('connect', () => {
      setSocketConnected(socket.connected);
    });
    setSocket(socket);
    return () => {
      socket.removeAllListeners();
      socket.close();
    };
  }, [setSocketConnected, setSocket]);

  const popError = useCallback(
    (errorMessage) => {
      setError(errorMessage);
      setShowError(true);
      // TODO: hide error after some time (click outside?)
    },
    [setError, setShowError],
  );

  if (!socket || !socketConnected) {
    return <div>Loading Socket...</div>;
  }

  return (
    <>
      <div className="position-fixed top-0 left-0 d-flex justify-content-center w-100">
        <Alert
          show={showError}
          variant="danger"
          onClose={() => setShowError(false)}
          dismissible
        >
          {error}
        </Alert>
      </div>
      {loading && (
        <ProgressBar
          animated
          // TODO: animate loader from left to right
          now={100}
          variant="primary"
          className="position-fixed w-100 rounded-0"
          style={{
            height: '10px',
            top: 0,
          }}
        />
      )}
      <Game
        socket={socket}
        popError={popError}
        loading={loading}
        setLoading={setLoading}
      />
    </>
  );
};

export default App;
