// Import React and Component
import React, { Component } from 'react';
// Import CSS from App.css
import './App.css';
// Import the Today component to be used below
import Today from './Today/Today'
import SendButton from './SendButton/SendButton'
// Import the History component to be used below
// import History from './History/History'

class App extends Component {
  render() {
    return (
       <div className="App section">
      <div className="box">
        <Today/>
        <div className="buttons is-flex" style={{ marginTop: "16px" }}>
          <SendButton/>
          <button className="button" style={{ flexGrow: 1 }}>
            Update
          </button>
        </div>
      </div>
    </div>
      
    );
  }
}
export default App;