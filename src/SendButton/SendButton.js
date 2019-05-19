import React, { Component } from 'react';
import './SendButton.css'
class SendButton extends Component {
    constructor(props) {
        super(props);
    }

    handleClick() {
        fetch('http://localhost:8080/disk.yandex.php', {
            method: "POST",
            headers: [
                ["Content-Type", "application/json"],
                ["Content-Type", "text/plain"]
            ],
            body: JSON.stringify({ 'action': 'saveNote', 'name': 'Английский2', 'text': "" })
        }).then(result => result.json())
    }

    render() {
        return (
            <button className="button" style={{ flexGrow: 1 }} onClick={this.handleClick}>
              Save
            </button>
        );
    }
}
export default SendButton;