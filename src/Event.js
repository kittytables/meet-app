import React, { Component } from 'react';

import './Event.css';

export default class Event extends Component {

    /*getInitialState() {
        return {data: []};
    }*/

    onSubmit() {
    }

    render() {
        return (
            <form>
                <label htmlFor="event">Event Name <br/>
                    <input id="event" autoFocus="true" required/>
                </label>

                <label htmlFor="type"> Event Type<br/>
                    <select id="type" name="Select">
                        <option value="birthday">Birthday</option>
                        <option value="holiday">Holiday</option>
                        <option value="educational">Educational</option>
                    </select>
                </label>

                <label htmlFor="location">Location <br/>
                    <input id="location" type="text"/>
                </label>

                <label htmlFor="start">Start <br/>
                    <input id="start" type="text" required/>
                </label>

                <label htmlFor="end">End<br/>
                    <input id="end" type="text"/>
                </label>

                <label htmlFor="guests">Guests<br/>
                    <input id="guests" type="text"/>
                </label>

                <label htmlFor="description">Event Description<br/>
                    <textarea id="description"></textarea>
                </label>

                <button type="Submit" onClick={this.onSubmit}>Create Event</button>
            </form>
        );
    }
}
