// Import React and Component
import React, { Component } from 'react';
// Import CSS from App.css
import './App.css';
// Import the Today component to be used below
import TextareaEditor from './TextareaEditor/TextareaEditor'
import SendButton from './SendButton/SendButton'

class App extends Component {
    constructor() {
        super();
        this.state = {
            text: '',
        };
    }
    componentDidMount() {
        fetch('http://localhost:8080/disk.yandex.php', {
            method: "POST",
            headers: [
                ["Content-Type", "application/json"],
                ["Content-Type", "text/plain"]
            ],
            body: JSON.stringify({ 'action': 'getNote', 'name': 'Английский' })
        }).then(result => result.json()).then(result => this.setState({ value: result.text }))

    }
    render() {
        return (
            <div className="App section">
      <div className="box">
        <textarea className="textarea" onChange={this.handleChange} value={this.state.text}></textarea>
        <div className="buttons is-flex" style={{ marginTop: "16px" }}>
          <button className="button" style={{ flexGrow: 1 }} >
        Save
      </button>
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