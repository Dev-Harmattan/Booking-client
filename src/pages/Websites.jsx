import React from 'react';
import { Companies } from '../components/Companies/Companies';
import { Header } from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import { Residencies } from '../components/Residencies/Residencies';
import { Value } from '../components/Value/Value';
import { Contact } from '../components/Contact/Contact';
import { GetStarted } from '../components/GetStarted/GetStarted';
import { Footer } from '../components/Footer/Footer';

export const Websites = () => {
  return (
    <div className="App">
      <div>
        <div className="white-gradient"></div>
        <Hero />
      </div>
      <Companies />
      <Residencies />
      <Value />
      <Contact />
      <GetStarted />
    </div>
  );
};
