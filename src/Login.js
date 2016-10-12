import React, { Component } from 'react';

import './Login.css';

export default class Login extends Component {
    render() {
        return (
            <form>
                <label htmlFor="email">Email
                    <input id="email" type="text" autoComplete="email" autoFocus="true" placeholder="Email"/>
                </label>
                <label htmlFor="password">Password
                    <input id="password" type="password" placeholder="Password"/>
                </label>
                <button type="Submit">Submit</button>
                <span className="subtext">
                    <a href="#" onClick={() => this.props.setCurrentPage('signup')}>Signup</a> for an account
                </span>
            </form>
        );
    }
}
