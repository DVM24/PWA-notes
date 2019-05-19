import React, { Component } from 'react';
import './SendButton.css'
class SendButton extends Component {
  constructor(props) {
    super(props);
    // this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    // this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // this.setState(prevState => ({
    //   isToggleOn: !prevState.isToggleOn
    // }));
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