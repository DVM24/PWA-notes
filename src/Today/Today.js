import React, { Component } from 'react';
    import './Today.css'
class Today extends Component {
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
  credentials: "include",
  body: JSON.stringify({'getNote':'Английский'})
}).then(result => result.json()).then(result =>this.setState({value: result.text}))

            // axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD')
                // .then(response => {
                    // We set the latest prices in the state to the prices gotten from Cryptocurrency.
                    // this.setState({ btcprice: response.data.BTC.USD });
                    // this.setState({ ethprice: response.data.ETH.USD });
                    // this.setState({ ltcprice: response.data.LTC.USD });
                // })
                // Catch any error here
                // .catch(error => {
                    // console.log(error)
                // })
        }
        // The render method contains the JSX code which will be compiled to HTML.
        handleChange(event) {
            this.setState({value: event.target.value});
        }
        render() {
            return (
                <textarea className="textarea" onChange={this.handleChange} rows="10" value={this.state.value}></textarea>
            )
        }
    }

    export default Today;