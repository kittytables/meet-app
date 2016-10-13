import React, { Component } from 'react';

import './Signup.css';

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
        console.log('hello', this.state);
    }

    validateInput = (event, errorKey) => {
        const isValid = event.target.checkValidity();
        this.setState({
            [errorKey]: !isValid
        });

        if (errorKey == 'hasConfirmPasswordError' &&
                this.state.password != this.state.confirmPassword) {
            this.setState({
                [errorKey]: true
            });
        }
    }

    reset = (event, errorKey) => {
        this.setState({
            [errorKey]: null
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
                        onBlur={(event) => this.validateInput(event, 'hasNameError')}
                        required
                    />
                    {this.state.hasNameError && (
                        <span className="error-message">Please input a name</span>
                    )}
                </label>

                <label htmlFor="email">
                    <span>Email</span>
                    <input
                        className={this.state.hasEmailError ? 'invalid' : ''}
                        value={this.state.email}
                        onChange={(event) => this.setState({email: event.target.value})}
                        id="email"
                        type="text"
                        autoComplete="email"
                        placeholder="name@email.com"
                        required
                        pattern="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"
                        onBlur={(event) => this.validateInput(event, 'hasEmailError')}
                   />
                   {this.state.hasEmailError && (
                        <span className="error-message">Please enter a valid email address</span>
                    )}
               </label>

                <label htmlFor="password">
                    <span>Password</span>
                    <input
                        className={this.state.hasPasswordError ? 'invalid' : ''}
                        value={this.state.password}
                        onChange={(event) => this.setState({password: event.target.value})}
                        id="password"
                        type="password"
                        placeholder="****************"
                        required
                        pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                        onBlur={(event) => this.validateInput(event, 'hasPasswordError')}
                    />
                    {this.state.hasPasswordError && (
                        <span className="error-message">Please enter an 8-character password with at least 1 Uppercase Alphabet, 1 Lowercase Alphabet, 1 Number and 1 Special Character</span>
                    )}
                </label>

                <label htmlFor="confirm-password">
                    <span>Confirm Password</span>
                    <input
                        className={this.state.hasConfirmPasswordError ? 'invalid' : ''}
                        value={this.state.confirmPassword}
                        onChange={(event) => this.setState({confirmPassword: event.target.value})}
                        id="confirm-password"
                        type="password"
                        required
                        placeholder="****************"
                        onBlur={(event) => this.validateInput(event, 'hasConfirmPasswordError')}
                    />
                    {this.state.hasConfirmPasswordError && (
                        <span className="error-message">Please enter the same password value as above.</span>
                    )}
                </label>

                <button
                    type="submit"
                    onClick={this.submit}
                    disabled={}>
                    Submit</button>

                <span className="subtext">
                    <a href="#" onClick={() => this.props.setCurrentPage('login')}>Login</a> to your account
                </span>
            </form>
        );
    }
}
