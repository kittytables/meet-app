import React, { Component } from 'react';

import './List.css';

var EVENTS = [
  {name: 'Gabys Birthday', start: 'Nov 9', end: 'Nov 13', type: 'birthday', guests: 'Gaby, Gaby, Kathleen', location: 'Los Angeles', description: 'trip to celebrate 25th bday'},
  {name: 'Eid Party', start: 'Sep 12', end: 'Sep 12', type: 'holiday', guests: 'Uzma, Ayesha, Faryal', location: 'Perlas', description: 'Park behind the restaurant'},
  {name: 'Afternoon Tea', start: 'Sep 24', end: 'Sep 24', type: 'holiday', guests: 'Uzma, Ayesha, Nadia, Kathleen', location: 'Bundricks Tea Parlor', description: '$25 per person'}
];

export default class List extends Component {
    render() {
        return (
            <div>
                 <EventTable events={EVENTS} />
            </div>
        );
    }
}


var EventRow = React.createClass({
  render: function() {
    return (
      <tr>
        <td>{this.props.event.name}</td>
        <td>{this.props.event.start}</td>
        <td>{this.props.event.end}</td>
        <td>{this.props.event.type}</td>
        <td>{this.props.event.guests}</td>
        <td>{this.props.event.location}</td>
        <td>{this.props.event.description}</td>
      </tr>
    );
  }
});

var EventTable = React.createClass({
  render: function() {
    var rows = [];

    this.props.events.forEach(function(event) {

      rows.push(<EventRow event={event} key={event.name} />);
    });
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Start</th>
            <th>End</th>
            <th>Type</th>
            <th>Guests</th>
            <th>Location</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
});
