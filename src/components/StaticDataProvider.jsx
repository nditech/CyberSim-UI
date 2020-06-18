import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';

const StaticDataContext = React.createContext(null);

export const useStaticData = () => {
  const context = useContext(StaticDataContext);
  if (context === undefined) {
    throw new Error('StaticDataProvider not found');
  }
  return context;
};

export const StaticDataProvider = ({ children }) => {
  // SYSTEMS
  const [systemsLoading, setSystemsLoading] = useState(false);
  const [systems, setSystems] = useState();
  useEffect(() => {
    setSystemsLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/systems`)
      .then(({ data }) => {
        setSystems(data);
      })
      .catch((e) => console.error(e))
      .finally(() => setSystemsLoading(false));
  }, [setSystems]);

  // MITIGATIONS
  const [mitigationsLoading, setMitigationsLoading] = useState(false);
  const [mitigations, setMitigations] = useState();
  useEffect(() => {
    setMitigationsLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/mitigations`)
      .then(({ data }) => {
        setMitigations(data);
      })
      .catch((e) => console.error(e))
      .finally(() => setMitigationsLoading(false));
  }, [setMitigations]);

  // INJECTIONS
  const [injectionsLoading, setInjectionsLoading] = useState(false);
  const [injections, setInjections] = useState();
  useEffect(() => {
    setInjectionsLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/injections`)
      .then(({ data }) => {
        setInjections(data);
      })
      .catch((e) => console.error(e))
      .finally(() => setInjectionsLoading(false));
  }, [setInjections]);

  // RESPONSES
  const [responsesLoading, setResponsesLoading] = useState(false);
  const [responses, setResponses] = useState();
  useEffect(() => {
    setResponsesLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/responses`)
      .then(({ data }) => {
        setResponses(data);
      })
      .catch((e) => console.error(e))
      .finally(() => setResponsesLoading(false));
  }, [setResponses]);

  return (
    <StaticDataContext.Provider
      value={{
        systemsLoading,
        systems,
        mitigationsLoading,
        mitigations,
        injectionsLoading,
        injections,
        responsesLoading,
        responses,
      }}
    >
      {children}
    </StaticDataContext.Provider>
  );
};
