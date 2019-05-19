import React, { Component } from 'react';
    import './TextareaEditor.css'
class TextareaEditor extends Component {
        // Adds a class constructor that assigns the initial state values:
        constructor () {
            super();
            this.state = {
                btcprice: '',
                ltcprice: '',
                ethprice: '',
                value: ''
            };
        }
        // This is called when an instance of a component is being created and inserted into the DOM.
        componentDidMount () {
            fetch('http://localhost:8080/disk.yandex.php', {
  method: "POST",
  headers: [
    ["Content-Type", "application/json"],
    ["Content-Type", "text/plain"]
  ],
  body: JSON.stringify({'action':'getNote','name':'Английский'})
}).then(result => result.json()).then(result =>this.setState({value: result.text}))

        }
        // The render method contains the JSX code which will be compiled to HTML.
        handleChange(event) {
            this.setState({value: event.target.value});
        }
        render() {
            return (
                <textarea className="textarea" onChange={this.handleChange} value={this.state.value}></textarea>
            )
        }
    }

export default TextareaEditor;