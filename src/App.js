import React, { Component } from 'react';

import './App.css';
import Header from './Header';
import Login from './Login';
import Signup from './Signup';
import Event from './Event';
import List from './List';
import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBbuRjEc_P9L_cKhAwDyz5ZC8RcLVpn-Ps",
    authDomain: "meetapp-ab3f2.firebaseapp.com",
    databaseURL: "https://meetapp-ab3f2.firebaseio.com",
    storageBucket: "meetapp-ab3f2.appspot.com",
    messagingSenderId: "259963451633"
  };

var fbase = firebase.initializeApp(config);

export default class App extends Component {
 constructor(props) {
    super(props);

    this.state = {
        currentPage: '',
        signedIn: null,
        user: null
    };

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            this.setState({signedIn: true, user: user});
            this.setCurrentPage('list');
        } else {
            this.setState({signedIn: false});
            this.setCurrentPage('login');
        }
    });

    this.setCurrentPage = this.setCurrentPage.bind(this);
    this.ref = firebase.database().ref();
  }

signOut = () => {
    firebase.auth().signOut().then(() => {
      this.setState({signedIn: false});
      this.setCurrentPage('login');
    }, function(error) {
      console.log(error.message);
    });
}

getUser = () => {
    return this.state.user;
}

 getCurrentPage() {
    if (this.state.currentPage === 'events') {
      return <Event db={this.ref} getUser={this.getUser} setCurrentPage={this.setCurrentPage}/>;
    }

    if (this.state.currentPage === 'signup') {
      return <Signup setCurrentPage={this.setCurrentPage} fbase={fbase}/>;
    }

    if (this.state.currentPage === 'login') {
      return <Login setCurrentPage={this.setCurrentPage} fbase={fbase}/>;
    }

    if (this.state.currentPage === 'list') {
      return <List getUser={this.getUser} setCurrentPage={this.setCurrentPage} fbase={fbase}/>;
    }

    if (this.state.currentPage !== '') {
        return <div>404 page not found</div>;
    }
  }


 setCurrentPage(pageName) {
    this.setState({currentPage: pageName})
 }

  render() {

    return (
        <div className="App">
            <Header signedIn={this.state.signedIn} signOut={this.signOut}/>
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
