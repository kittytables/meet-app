import React, { Component } from 'react';

import './Signup.css';

var errors = {
    name: 'Please input a name',
    email: 'Please enter a valid email address',
    password: 'Include at least 1 Uppercase Alphabet, 1 Lowercase Alphabet, 1 Number and 1 Special Character'
}

export default class Signup extends Component {
    validateInput(e) {
        var element = e.target;
        var validity = true;
        var errorMessage = '';

        if (!element.checkValidity()) {
            validity = false;
        }

        if (!validity) {
            element.classList.add('invalid');
            errorMessage = errors[element.id];
        } else {
            element.classList.remove('invalid');
        }
    }

    render() {
        return (
            <form>
                <label htmlFor="name">Name
                    <input id="name" autoFocus="true" autoComplete="name" placeholder="e.g. Jane Doe"
                    required onBlur={this.validateInput}/>
                </label>

                <label htmlFor="email">Email
                   <input id="email" type="text" autoComplete="email" placeholder="name@email.com" required
                   pattern="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$" onBlur={this.validateInput}/>
               </label>

                <label htmlFor="password">Password
                    <input id="password" type="password" placeholder="****************" required
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}"
                    onBlur={this.validateInput}/>
                </label>

                <label htmlFor="confirm-password">Confirm Password
                    <input id="confirm-password" type="password" placeholder="****************" required
                    onBlur={this.validateInput}/>
                </label>

                <button type="Submit">Submit</button>
                <span className="subtext">
                <a href="#" onClick={() => this.props.setCurrentPage('login')}>Login</a> to your account
            </span>
            </form>

        );
    }
}
