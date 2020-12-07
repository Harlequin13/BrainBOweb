import React from 'react';

import logo from '../assets/images/logo.png'
import '../Styles/Components/header.css';

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="header-logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="titlewrapper">
          <h1 className="title">BrainBO</h1>
        </div>
      </div>
    );
  }
}

export default Header;
