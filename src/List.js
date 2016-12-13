import React, { Component } from 'react';

import './List.css';
import moment from 'moment';

export default class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            eventList: {}
        }

        this.props.fbase.database().ref('/events')
        .orderByChild('userid').equalTo(this.props.getUser().uid)
        .once('value').then((snapshot) => {
            this.setState({eventList: snapshot.val()});
        });
    }

    render() {
        return (
            <div className="rows">
                <a href="#" className="new-event" onClick={() => this.props.setCurrentPage('events')}>
                Create a new event</a>
                <EventTable events={this.state.eventList} />
            </div>
        );
    }
}

var EventRow = React.createClass({
  render: function() {
    var start = moment(this.props.event.start).format("MM/DD/YY h:mm A");
    var end = '';

    if(moment(this.props.event.end).isValid()) {
        end = moment(this.props.event.start).isSame(this.props.event.end, 'day') ?
           moment(this.props.event.end).format("h:mm A") : moment(this.props.event.end).format("MM/DD/YY h:mm A");
    }

    return (
        <div className="event">
            <h2>{this.props.event.name}</h2>
            <h3><b>{start} {end && (<span>-</span>)} {end}</b><br/>
            @ {this.props.event.location}</h3>
            <p>{this.props.event.description}</p>
            <b>Type of event:</b> {this.props.event.type}<br/>
            {this.props.event.guests && (
                <b>Attendees:</b>
            )} {this.props.event.guests}
        </div>
    );
  }
});

var isPastEvent = (item) => {
    return moment().isAfter(new Date(item.props.event.end));
}

var isCurrentEvent = (item) => {
    return moment().isBefore(new Date(item.props.event.end));
}

var EventTable = React.createClass({
  render: function() {
    var rows = [];

    for(var key in this.props.events) {
        if(this.props.events[key]) {
            var event = this.props.events[key];
            rows.push(<EventRow event={event} key={event.name}/>);
        }
    }

    rows.sort(function(a, b) {
        if (moment(a.props.event.start).isBefore(b.props.event.start)) {
            return -1;
        }
        if (moment(a.props.event.start).isAfter(b.props.event.start)) {
            return 1;
        }
        return 0;
    });

    var past = rows.filter(isPastEvent).reverse();
    var current = rows.filter(isCurrentEvent);

    return (
      <div>
        {current.length !== 0 && (<h2>Upcoming Events</h2>)}
        {current}
        <hr/>
        {past.length !== 0 && (<h2>Past Events</h2>)}
        {past}
      </div>
    );
  }
});
