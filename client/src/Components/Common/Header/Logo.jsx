import React from 'react';
import logo from './../../../assets/logo.svg';
export default ({ showlogo }) => {
  const logoimg = showlogo ? <img alt="GSG" src={logo} /> : '';
  return <div>{logoimg}</div>;
};
