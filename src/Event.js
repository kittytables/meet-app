import React, { Component } from 'react';

import './Event.css';

export default class Event extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userid: '',
            name: '',
            type: 'birthday',
            location: '',
            start: '',
            end: '',
            guests: '',
            description: ''
        };
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
                <label htmlFor="event">Event Name <br/>
                    <input id="event" autoFocus="true" required
                        value={this.state.name}
                        onChange={(event) => this.setState({name: event.target.value})}/>
                </label>

                <label htmlFor="type"> Event Type<br/>
                    <select id="type" name="Select" value={this.state.type}
                        onChange={(event) => this.setState({type: event.target.value})}>
                        <option value="birthday">Birthday</option>
                        <option value="holiday">Holiday</option>
                        <option value="educational">Educational</option>
                    </select>
                </label>

                <label htmlFor="location">Location <br/>
                    <input id="location" type="text"
                        value={this.state.location}
                        onChange={(event) => this.setState({location: event.target.value})}/>
                </label>

                <label htmlFor="start">Start <br/>
                    <input id="start" type="text" required
                        value={this.state.start}
                        onChange={(event) => this.setState({start: event.target.value})}/>
                </label>

                <label htmlFor="end">End<br/>
                    <input id="end" type="text"
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

                <button type="Submit" onClick={this.submit}>Create Event</button>
            </form>
            </div>
        );
    }
}
