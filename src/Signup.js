import React, { Component } from 'react';

import './Signup.css';

var errors = {
    name: 'Please input a name',
    email: 'Please enter a valid email address',
    password: 'Include at least 1 Uppercase Alphabet, 1 Lowercase Alphabet, 1 Number and 1 Special Character'
}

export default class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',

            hasNameError: null,
            hasEmailError: null,
            hasPasswordError: null,
            hasConfirmPasswordError: null,
        };
    }

    submit = () => {
        console.log('hello', this.state)
    }

    validateName = (event, errorKey) => {
        const isValid = event.target.checkValidity();
        this.setState({
            [errorKey]: !isValid
        });
    }

    render() {
        return (
            <form>
                <label htmlFor="name">
                    <span>Name</span>
                    <input
                        className={this.state.hasNameError ? 'invalid' : ''}
                        value={this.state.name}
                        onChange={(event) => this.setState({name: event.target.value})}
                        id="name"
                        autoFocus="true"
                        autoComplete="name"
                        placeholder="e.g. Jane Doe"
                        onBlur={(event) => this.validateName(event, 'hasNameError')}
                        required
                    />
                    {this.state.hasNameError && (
                        <span className="error-message">Please input a name</span>
                    )}
                </label>

                <label htmlFor="email">
                    <span>Email</span>
                    <input
                       value={this.state.email}
                       id="email"
                       type="text"
                       autoComplete="email"
                       placeholder="name@email.com"
                       required
                       pattern="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$" onBlur={this.validateInput}
                   />
               </label>

                <label htmlFor="password">
                    <span>Password</span>
                    <input
                        value={this.state.password}
                        id="password"
                        type="password"
                        placeholder="****************"
                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}"
                        required
                    />
                </label>

                <label htmlFor="confirm-password">
                    <span>Confirm Password</span>
                    <input
                        value={this.state.confirmPassword}
                        id="confirm-password"
                        type="password"
                        placeholder="****************"
                        required
                    />
                </label>

                <button
                    type="submit"
                    onClick={this.submit}
                >Submit</button>

                <span className="subtext">
                    <a href="#" onClick={() => this.props.setCurrentPage('login')}>Login</a> to your account
                </span>
            </form>
        );
    }
}
