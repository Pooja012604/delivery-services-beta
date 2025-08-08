import React, { createContext, useState, useEffect } from 'react';

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('location'));
    if (saved) {
      setCountry(saved.country);
      setState(saved.state);
      setCity(saved.city);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('location', JSON.stringify({ country, state, city }));
  }, [country, state, city]);

  return (
    <LocationContext.Provider value={{ country, state, city, setCountry, setState, setCity }}>
      {children}
    </LocationContext.Provider>
  );
};
