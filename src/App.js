// Import React and Component
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// Import CSS from App.css
import './App.css';
// Import the Today component to be used below
import TextareaEditor from './TextareaEditor/TextareaEditor'
import SendButton from './SendButton/SendButton'

class ListElement extends React.Component {
    constructor() {
        super();
        this.state = {
            app: ReactDOM.render(<App />, document.getElementById('root'))
        };
    }
    handleClick(e) {
        this.state.app.setState({ note: this.props.name })
        fetch('http://192.168.42.36:8080/disk.yandex.php', {
            method: "POST",
            headers: [
                ["Content-Type", "application/json"],
                ["Content-Type", "text/plain"]
            ],
            body: JSON.stringify({ 'action': 'getNote', 'name': this.props.name })
        }).then(result => result.json()).then(result => this.state.app.setState({ text: result.text }))
        // this.state.app.forceUpdate()
        e.preventDefault();
        return false
    }
    render() {
        return <p className="control">
        <button className={'button '+ (this.props.selected?'is-success':'')} onClick={(e) => {this.handleClick(e); }}>
                       {this.props.name}
                     </button>
        </p>
    }
}

class List extends React.Component {
    constructor() {
        super();
    }


    render() {
        // var elements = arrayOfElements;

        var elementList = Array.from(this.props.elements).map((element, i) => {
            if (this.props.selectedNote === element.name)
                return <ListElement key={i} name={element.name} selected={true}/>
            else
                return <ListElement key={i} name={element.name} selected={false}/>
        })
        // console.log(this.state.elements.items);
        return <div id="list" className="field has-addons">{elementList}</div>
    }
}
class App extends Component {
    constructor() {
        super();
        this.state = {
            text: '',
            note: '',
            elements: []
        };
    }
    componentDidMount() {
        this.getNotes()
    }
    getNotes() {
        fetch('http://192.168.42.36:8080/disk.yandex.php', {
            method: "POST",
            headers: [
                ["Content-Type", "application/json"],
                ["Content-Type", "text/plain"]
            ],
            body: JSON.stringify({ 'action': 'getNotes' })
        }).then(result => result.json()).then(result => this.setState({ elements: result.items }))
    }
    handleSave(e, state) {
        fetch('http://192.168.42.36:8080/disk.yandex.php', {
            method: "POST",
            headers: [
                ["Content-Type", "application/json"],
                ["Content-Type", "text/plain"]
            ],
            body: JSON.stringify({ 'action': 'saveNote', 'name': state.note, 'text': state.text })
        }).then(result => result.json())
    }
    handleAdd(e, state) {
        fetch('http://192.168.42.36:8080/disk.yandex.php', {
            method: "POST",
            headers: [
                ["Content-Type", "application/json"],
                ["Content-Type", "text/plain"]
            ],
            body: JSON.stringify({ 'action': 'addNote', 'name': state.name_add, 'text': state.text })
        }).then(result => result.json()).then(result => this.setState({ elements: result.items }))
    }
    handleChange(event) {
        this.setState({ text: event.target.value });
    }
    handleChangeName(event) {
        this.setState({ name_add: event.target.value });
    }
    render() {
        return (
            <div className="App section">
            <List elements={this.state.elements} selectedNote={this.state.note}/>
      <div className="box">
      <h1>{this.state.note}</h1>
        <textarea className="textarea" onChange={(e) => {this.handleChange(e); }} value={this.state.text}></textarea>
        <div className="buttons is-flex" style={{ marginTop: "16px" }}>
          <button className="button is-success" style={{ flexGrow: 1 }} onClick={(e) => {this.handleSave(e,this.state); }}>
            Save
          </button>
          <button className="button is-info" style={{ flexGrow: 1 }}>
            Update
          </button>
          
        </div>
        <div className="field ">
  <div className="control is-flex">
          <input className="input is-info" type="text" onChange={(e) => {this.handleChangeName(e); }}  style={{ flexGrow: 1 }}/>
          <button className="button is-primary" onClick={(e) => {this.handleAdd(e,this.state); }} style={{ flexGrow: 1 }}>
            Add
          </button>
          </div>
          </div>
      </div>
    </div>

        );
    }
}
export default App;