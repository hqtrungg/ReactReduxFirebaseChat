import React, { Component } from 'react';
import Message from './Message';
import InitialLeftColumn from './InitialLeftColumn';
import UserList from './UserList';
import SearchForm from './SearchForm';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import '../App.css'
import Navbar from './Navbar';
import Panel from './Panel';


class Home extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <div className="left">
            <SearchForm onUserLogin={this.handleUserLogin} />
            <Switch>
              <Route path='/home' component={InitialLeftColumn} />
              <Route path='/inbox' component={UserList} />
            </Switch>
          </div>
          <div className="right">
            <Panel />
            <Switch>
              <Route path='/home' component={Message} />
              <Route path='/inbox/:touserid' component={Message} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default Home;
