import React, { Component } from 'react';

import './List.css';

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
                 <EventTable events={this.state.eventList} />
                 <a href="#" onClick={() => this.props.setCurrentPage('events')}>Create new event</a>
            </div>
        );
    }
}

var EventRow = React.createClass({
  render: function() {
    return (
        <div className="event">
            <h2>{this.props.event.name}</h2>
            <h3><b>{this.props.event.start} - {this.props.event.end}</b><br/>
            @ {this.props.event.location}</h3>
            <p>{this.props.event.description}</p>
            <b>Type of event:</b> {this.props.event.type}<br/>
            <b>Attendees:</b> {this.props.event.guests}
            <hr/>
        </div>
    );
  }
});

var EventTable = React.createClass({
  render: function() {
    var rows = [];

    for(var key in this.props.events) {
        rows.push(<EventRow event={this.props.events[key]} key={this.props.events[key].name} />);
    }

    return (
      <div>
        <hr/>
        {rows}
      </div>
    );
  }
});
