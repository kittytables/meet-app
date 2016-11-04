import React, { Component } from 'react';

import './Event.css';

export default class Event extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userid: '',
            name: '',
            type: 'General',
            location: '',
            start: '',
            end: '',
            guests: '',
            description: '',

            hasNameError: null,
            hasLocationError: null,
            hasTimeError: null,
            formError: ''
        };
    }

    validateInput = (event, errorKey) => {
        if (event.target.value) {
            const isValid = event.target.checkValidity();
            this.setState({
                [errorKey]: !isValid
            });
        }
    }

    validateForm = (event) => {
        event.preventDefault();

        this.setState({
            hasNameError: !this.state.name,
            hasLocationError: !this.state.location,
            hasTimeError: !this.state.start
        });

        if (!this.state.name || !this.state.location || !this.state.start) {
            this.setState({
                formError: 'Please fill out required form inputs.'
            });
        } else {
            this.setState({
                formError: ''
            });
            this.submit();
        }
    }

    submit = () => {
        var eventsRef = this.props.db.child("events");
        var user = this.props.getUser();
        eventsRef.push({
            userid: user.uid,
            name: this.state.name,
            type: this.state.type,
            location: this.state.location,
            start: this.state.start,
            end: this.state.end,
            guests: this.state.guests,
            description: this.state.description
         });

        this.props.setCurrentPage('list');
    }

    render() {
        return (
            <div className="rows">
            <a href="#" className="new-event" onClick={() => this.props.setCurrentPage('list')}>
                Back to event list
            </a>
            <form>
                <label htmlFor="event">Event Name* <br/>
                    <input id="event" autoFocus="true"
                        required
                        value={this.state.name}
                        className={this.state.hasNameError ? 'invalid' : ''}
                        onChange={(event) => this.setState({name: event.target.value})}
                        onBlur={(event) => this.validateInput(event, 'hasNameError')}/>
                </label>

                <label htmlFor="type"> Event Type<br/>
                    <select id="type" name="Select" value={this.state.type}
                        onChange={(event) => this.setState({type: event.target.value})}>
                        <option value="General">General</option>
                        <option value="Birthday">Birthday</option>
                        <option value="Holiday">Holiday</option>
                        <option value="Educational">Educational</option>
                    </select>
                </label>

                <label htmlFor="location">Location* <br/>
                    <input id="location" type="text" required
                        value={this.state.location}
                        className={this.state.hasLocationError ? 'invalid' : ''}
                        onChange={(event) => this.setState({location: event.target.value})}
                        onBlur={(event) => this.validateInput(event, 'hasLocationError')}/>
                </label>

                <label htmlFor="start">Start* <br/>
                    <input id="start" type="datetime-local" required
                        value={this.state.start}
                        className={this.state.hasTimeError ? 'invalid' : ''}
                        onChange={(event) => this.setState({start: event.target.value})}
                        onBlur={(event) => this.validateInput(event, 'hasTimeError')}/>
                </label>

                <label htmlFor="end">End<br/>
                    <input id="end" type="datetime-local"
                        value={this.state.end}
                        onChange={(event) => this.setState({end: event.target.value})}/>
                </label>

                <label htmlFor="guests">Guests<br/>
                    <input id="guests" type="text"
                        value={this.state.guests}
                        onChange={(event) => this.setState({guests: event.target.value})}/>
                </label>

                <label htmlFor="description">Event Description<br/>
                    <textarea id="description"
                        value={this.state.description}
                        onChange={(event) => this.setState({description: event.target.value})}></textarea>
                </label>

                <button type="Submit" onClick={this.validateForm}>Create Event</button>
            </form>
            </div>
        );
    }
}
