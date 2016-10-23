import React, { Component } from 'react';

import './Login.css';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            loginError: ''
        };
    }

    submit = () => {
        this.props.fbase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
          if(error.code.includes('user-not-found') || error.code.includes('wrong-password')) {
                this.setState({loginError: 'Please check your email and password.'});
            } else {
                this.setState({loginError: 'Could not sign in. Try again later.'});
            }
        });
    }

    render() {
        return (
            <form>
                <label htmlFor="email">Email
                    <input id="email" type="text"
                        autoComplete="email"
                        autoFocus="true"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={(event) => this.setState({email: event.target.value})}/>
                </label>
                <label htmlFor="password">Password
                    <input id="password" type="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={(event) => this.setState({password: event.target.value})}/>
                </label>
                <button type="Submit" onClick={this.submit}>Submit</button>
                <div className="error-message">
                    {this.state.loginError} <br/>
                </div>
                <span className="subtext">
                    <a href="#" onClick={() => this.props.setCurrentPage('signup')}>Signup</a> for an account
                </span>
            </form>
        );
    }
}
