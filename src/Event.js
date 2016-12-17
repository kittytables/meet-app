import React, { Component } from 'react';

import './Event.css';
import '../node_modules/react-datepicker/dist/react-datepicker.css'
import moment from 'moment';
import DatePicker from 'react-datepicker';

export default class Event extends Component {

    constructor(props) {
        super(props);

        this.today = moment().format("YYYY-MM-DD");

        this.state = {
            userid: '',
            name: '',
            type: 'General',
            location: '',
            startDate: moment().add(30 - moment().minute() % 30, 'minutes'),
            starttime: moment().add(30 - moment().minute() % 30, 'minutes').format("hh:mm"),
            starttime2: moment().add(30 - moment().minute() % 30, 'minutes').format("a"),
            endDate: moment().add(60 - moment().minute() % 30, 'minutes'),
            endtime: moment().add(60 - moment().minute() % 30, 'minutes').format("hh:mm"),
            endtime2: moment().add(60 - moment().minute() % 30, 'minutes').format("a"),
            guests: '',
            description: '',

            hasTimeError: null,
            hasNameError: null,
            hasLocationError: null,
            hasGuestsError: null,
            formError: ''
        };
    }

    validateInput = (event, errorKey) => {
        const isValid = event.target.checkValidity();
        this.setState({
            [errorKey]: !isValid
        });
    }

    validateForm = (event) => {
        event.preventDefault();

        this.validateTime();
        this.setState({
            formError: '',
            hasNameError: !this.state.name,
            hasLocationError: !this.state.location,
            hasGuestsError: !this.state.guests
        }, () => {
            if (this.state.hasNameError || this.state.hasLocationError || this.state.hasGuestsError) {
                this.setState({
                    formError: 'Please fill out required form inputs. '
                });
            }

            if (this.state.hasTimeError && !this.state.hasNameError
                && !this.state.hasLocationError && !this.state.hasGuestsError) {
                this.setState({
                    formError: 'Please make sure end time is after the start time.'
                });
            } else if (this.state.hasTimeError) {
                this.setState({
                    formError: 'Please fill out required form inputs. Please make sure end time is after the start time.'
                });
            }

            if(!this.state.hasTimeError && !this.state.hasNameError
                && !this.state.hasLocationError && !this.state.hasGuestsError) {
                this.setState({
                    formError: ''
                });
                this.submit();
            }
        });
    }

    validateTime = () => {
        var start = this.state.startDate.format("YYYY-MM-DD") + ' ' + this.state.starttime + ':00 ' + this.state.starttime2;
        var end = this.state.endDate.format("YYYY-MM-DD") + ' ' + this.state.endtime + ':00 ' + this.state.endtime2;

        if (moment(new Date(start)).isAfter(new Date(end))) {
            this.setState({
                hasTimeError: true
            });
        } else {
            this.setState({
                hasTimeError: false
            });
        }
    }

    setTime = (event, inputName) => {
        if (event.target.value) {
            var time = moment(event.target.value, "hh:mm");

            if(time.hour() > 12) {
                time = time.subtract(12, 'hours');
            }

            this.setState({[inputName]: time.format("hh:mm")});
        }
    }

    setDate = (date, inputName) => {
        if(date.isValid()) {
            this.setState({[inputName]: date});

            if(inputName === 'startDate') {
                this.setState({
                    endDate: moment(date).isAfter(this.state.endDate) ? date : this.state.endDate
                });
            }
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
            start: moment(this.state.startDate.format("YYYY-MM-DD") + this.state.starttime + this.state.starttime2, "YYYY-MM-DDhh:mma").format(),
            end: moment(this.state.endDate.format("YYYY-MM-DD") + this.state.endtime + this.state.endtime2, "YYYY-MM-DDhh:mma").format(),
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
                    <select id="type" required name="Select" value={this.state.type}
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

                <label htmlFor="startdate">Start date <br/>
                    <DatePicker
                        id="startdate"
                        selected={this.state.startDate}
                        onChange={(date) => this.setDate(date, 'startDate')}
                        minDate={moment()}
                        onBlur={this.validateTime}
                        required/>
                </label>

                <label htmlFor="starttime">Start time <br/>
                    <input id="starttime" type="time" className="time"
                        value={this.state.starttime}
                        onChange={(event) => this.setTime(event, 'starttime')}
                        onBlur={this.validateTime}
                        required
                    />
                    <select required id="starttime-2" name="Select" className="time" value={this.state.starttime2}
                    onChange={(event) => this.setState({starttime2: event.target.value})} onBlur={(event) => this.validateTime(event)}>
                        <option value="am">AM</option>
                        <option value="pm">PM</option>
                    </select>
                </label>

                <label htmlFor="enddate">End date<br/>
                    <DatePicker
                        id="enddate"
                        selected={this.state.endDate}
                        onChange={(date) => this.setDate(date, 'endDate')}
                        minDate={this.state.startDate}
                        onBlur={this.validateTime}
                        required/>
                </label>

                <label htmlFor="endtime">End time <br/>
                    <input id="endtime" type="time" className={this.state.hasTimeError ? 'time invalid' : 'time'}
                        value={this.state.endtime}
                        onChange={(event) => this.setTime(event, 'endtime')}
                        onBlur={(event) => this.validateTime(event)}
                        required/>
                    <select required id="endtime-2" name="Select" className={this.state.hasTimeError ? 'time invalid' : 'time'}
                        value={this.state.endtime2} onChange={(event) => this.setState({endtime2: event.target.value})}
                        onBlur={this.validateTime}>
                        <option value="am">AM</option>
                        <option value="pm">PM</option>
                    </select>
                </label>

                {this.state.hasTimeError && (
                    <span className="error-message">Please make sure end time is after the start time.</span>
                )}

                <label htmlFor="guests">Guests<br/>
                    <input id="guests" type="text" required
                        className={this.state.hasGuestsError ? 'invalid' : ''}
                        value={this.state.guests}
                        onChange={(event) => this.setState({guests: event.target.value})}
                        onBlur={(event) => this.validateInput(event, 'hasGuestsError')}/>
                </label>

                <label htmlFor="description">Event Description<br/>
                    <textarea id="description"
                        value={this.state.description}
                        onChange={(event) => this.setState({description: event.target.value})}></textarea>
                </label>

                <button type="Submit" onClick={this.validateForm}>Create Event</button>
                <div className="error-message">
                    {this.state.formError} <br/>
                </div>
            </form>
            </div>
        );
    }
}
