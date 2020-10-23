import React from 'react';
import logo from '../../../logo.png';
export default ({ showlogo }) => {
 
  const logoimg = showlogo ? <img alt="..." src={logo} style={{width : 200 ,
    marginTop: 15}} /> : '';
  return <div style={{display: 'flex',
  justifyContent:  'flex-end'}} >{logoimg}</div>;
};
