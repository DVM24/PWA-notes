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
        fetch(`${process.env.REACT_APP_CORS_PROXY ||
      ''}http://ce53626.tmweb.ru/disk.yandex.php?action=getNote&name=${this.props.name}`, {
            headers: [
                ["Content-Type", "application/json"],
                ["Content-Type", "text/plain"]
            ],
        }).then(result => result.json()).then(result => this.state.app.setState({ note: result }))
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
            name_add: '',
            note: '',
            elements: []
        };
    }
    componentDidMount() {
        this.getNotes()
    }
    getNotes() {
        fetch(`${process.env.REACT_APP_CORS_PROXY || ''}http://ce53626.tmweb.ru/disk.yandex.php?action=getNotes`, {
                headers: [
                    ["Content-Type", "application/json"],
                    ["Content-Type", "text/plain"]
                ]
            }).then(result => result.json())
            .then(result => this.setState({ elements: result.items }))
        // .then(result => {
        //     const elements = Array.from(JSON.parse(localStorage.getItem('state')));
        //     return result
        //     localStorage.setItem('state', JSON.stringify(this.state.elements))
        // })

    }
    handleSave(e, state) {

        if (localStorage.getItem('state') == null) {
            fetch(`${process.env.REACT_APP_CORS_PROXY || ''}http://ce53626.tmweb.ru/disk.yandex.php?action=saveNote`, {
                    method: "POST",
                    headers: [
                        ["Content-Type", "application/json"],
                        ["Content-Type", "text/plain"]
                    ],
                    body: JSON.stringify({ 'action': 'saveNote', 'name': state.note.name, 'text': state.note.text })
                }).then(result => result.json())
                .catch(function(err) {
                    state.elements.map((element, i) => {
                        if (element.name === state.note.name) {
                            element.text = state.note.text;
                        }
                    })
                    localStorage.setItem('state', JSON.stringify(state.elements))
                });
        } else {
            fetch(`${process.env.REACT_APP_CORS_PROXY || ''}http://ce53626.tmweb.ru/disk.yandex.php?action=syncNotes`, {
                method: "POST",
                headers: [
                    ["Content-Type", "application/json"],
                    ["Content-Type", "text/plain"]
                ],
                body: JSON.stringify({ 'action': 'syncNotes', 'notes': JSON.parse(localStorage.getItem('state')) })
            }).then(result => {
                localStorage.removeItem('state');
            }).catch(function(err) {
                const elements = Array.from(JSON.parse(localStorage.getItem('state')));
                elements.map((element, i) => {
                    if (element.name === state.note.name) {
                        element.text = state.note.text;
                    }
                })
                localStorage.setItem('state', JSON.stringify(elements))
            })
        }

    }
    handleAdd(e, state) {
        fetch(`${process.env.REACT_APP_CORS_PROXY || ''}http://ce53626.tmweb.ru/disk.yandex.php?action=addNotes`, {
            method: "POST",
            headers: [
                ["Content-Type", "application/json"],
                ["Content-Type", "text/plain"]
            ],
            body: JSON.stringify({ 'action': 'addNote', 'name': state.name_add, 'text': state.note.text })
        }).then(result => result.json()).then(result => this.setState({ elements: result.items }))
    }
    handleChange(event) {
        const note = this.state.note;
        note.text = event.target.value;
        this.setState({ note: note });
    }
    handleChangeName(event) {
        this.setState({ name_add: event.target.value });
    }
    render() {
        return (
            <div className="App section">
            <List elements={this.state.elements} selectedNote={this.state.note.name}/>
      <div className="box">
      <h1>{this.state.note.name}</h1>
        <textarea className="textarea" onChange={(e) => {this.handleChange(e); }} value={this.state.note.text}></textarea>
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