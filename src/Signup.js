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
            accountError: '',

        };
    }

    submit = () => {
        /*var usersRef = this.props.db.child("users");
        var exists = false;

        usersRef.once('value', (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                if(this.state.email === childSnapshot.val().email) {
                    exists = true;
                }
            })
            this.saveData(usersRef, exists);
        });*/

        this.props.fbase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
            if(error.code.includes('email-already-in-use')) {
                this.setState({accountError: 'Account already exists'});
            } else {
                this.setState({accountError: 'Error creating account'});
            }
        });
    }

    validateInput = (event, errorKey) => {
        if (event.target.value) {
            const isValid = event.target.checkValidity();
            this.setState({
                [errorKey]: !isValid
            });
        }
    }

    validatePassword = (event, errorKey) => {
        if (errorKey === 'hasPasswordError') {
            this.validateInput(event, errorKey);
        }

        if (this.state.confirmPassword) {
            this.setState({
                hasConfirmPasswordError: this.state.password !== this.state.confirmPassword ? true : false
            });
        }
    }

    revalidateInput = (event, errorKey) => {
        if (this.state[errorKey]) {
            console.log('true');
        }
    }

    reset = (event, errorKey) => {
        this.setState({
            [errorKey]: null
        });
    }

    saveData = (usersRef, exists) => {
        if (exists) {
            this.setState({
                hasAccountError: true
            });
        } else {
            usersRef.push({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
             });

            this.props.setCurrentPage('login');
        }
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
                        onBlur={(event) => this.validatePassword(event, 'hasPasswordError')}
                    />
                    {this.state.hasPasswordError && (
                        <span className="error-message">Please enter an 8-character password with at least 1 Uppercase Alphabet, 1 Lowercase Alphabet, 1 Number and 1 Special Character</span>
                    )}
                </label>

                <label htmlFor="confirm-password">
                    <span>Confirm Password</span>
                    <input
                        className={this.state.hasPasswordError || this.state.hasConfirmPasswordError ? 'invalid' : ''}
                        value={this.state.confirmPassword}
                        onChange={(event) => this.setState({confirmPassword: event.target.value})}
                        id="confirm-password"
                        type="password"
                        required
                        placeholder="****************"
                        onBlur={(event) => this.validatePassword(event, 'hasConfirmPasswordError')}
                    />
                    {this.state.hasConfirmPasswordError && (
                        <span className="error-message">Please enter the same password value as above.</span>
                    )}
                </label>

                <button
                    type="submit"
                    onClick={this.submit}
                    disabled={!this.state.name || !this.state.email || !this.state.password
                        || !this.state.confirmPassword || this.state.hasEmailError ||
                        this.state.hasPasswordError || this.state.hasConfirmPasswordError}>
                    Submit</button>
                    <div className="error-message">
                        {this.state.accountError} <br/>
                    </div>

                <span className="subtext">
                    <a href="#" onClick={() => this.props.setCurrentPage('login')}>Login</a> to your account
                </span>
            </form>
        );
    }
}
