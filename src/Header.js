import React, { Component } from 'react';
import logo from './logo.svg';

import './Header.css';

export default class Header extends Component {
    render() {
        return (
          <header>
            <div className="title">
                <h1><img src={logo} className="logo" alt="logo" />MeetApp</h1>
            </div>
          </header>
        );
    }
}
