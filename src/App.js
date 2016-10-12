import React, { Component } from 'react';

import './App.css';
import Header from './Header';
import Login from './Login';
import Signup from './Signup';
import Event from './Event';
import List from './List';

export default class App extends Component {
 constructor(props) {
      super(props);

      this.state = {
        currentPage: 'signup',
      };

      this.setCurrentPage = this.setCurrentPage.bind(this);
  }

 getCurrentPage() {
    if (this.state.currentPage === 'events') {
      return <Event />;
    }

    if (this.state.currentPage === 'signup') {
      return <Signup setCurrentPage={this.setCurrentPage}/>;
    }

    if (this.state.currentPage === 'login') {
      return <Login setCurrentPage={this.setCurrentPage}/>;
    }

    return <div>404 page not found</div>;
  }


 setCurrentPage(pageName) {
    this.setState({currentPage: pageName})
 }

  render() {

    return (
        <div className="App">
            <Header />
            <br/>
            <content>
                <div className="App-main">
                    {this.getCurrentPage()}
                </div>
            </content>
        </div>

    );

  }
}
