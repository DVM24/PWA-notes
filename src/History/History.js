import React, { Component } from 'react';
import './History.css'
class History extends Component {
      constructor () {
        super();
        this.state = {
            todayprice: {},
            yesterdayprice: {},
            twodaysprice: {},
            threedaysprice: {},
            fourdaysprice: {}
        }
      }
		render() {
            return (
                <div className="history--section container">
                    <h2>History (Past 5 days)</h2>
                    <div className="history--section__box">
                        <div className="history--section__box__inner">
                            <h4>{this.state.todayprice.date}</h4>
                            <div className="columns">
                                <div className="column">
                                    <p>1 BTC = ${this.state.todayprice.btc}</p>
                                </div>
                                <div className="column">
                                    <p>1 ETH = ${this.state.todayprice.eth}</p>
                                </div>
                                <div className="column">
                                    <p>1 LTC = ${this.state.todayprice.ltc}</p>
                                </div>
                            </div>
                        </div>
                        <div className="history--section__box__inner">
                            <h4>{this.state.yesterdayprice.date}</h4>
                            <div className="columns">
                                <div className="column">
                                    <p>1 BTC = ${this.state.yesterdayprice.btc}</p>
                                </div>
                                <div className="column">
                                    <p>1 ETH = ${this.state.yesterdayprice.eth}</p>
                                </div>
                                <div className="column">
                                    <p>1 LTC = ${this.state.yesterdayprice.ltc}</p>
                                </div>
                            </div>
                        </div>
                        <div className="history--section__box__inner">
                            <h4>{this.state.twodaysprice.date}</h4>
                            <div className="columns">
                                <div className="column">
                                    <p>1 BTC = ${this.state.twodaysprice.btc}</p>
                                </div>
                                <div className="column">
                                    <p>1 ETH = ${this.state.twodaysprice.eth}</p>
                                </div>
                                <div className="column">
                                    <p>1 LTC = ${this.state.twodaysprice.ltc}</p>
                                </div>
                            </div>
                        </div>
                        <div className="history--section__box__inner">
                            <h4>{this.state.threedaysprice.date}</h4>
                            <div className="columns">
                                <div className="column">
                                    <p>1 BTC = ${this.state.threedaysprice.btc}</p>
                                </div>
                                <div className="column">
                                    <p>1 ETH = ${this.state.threedaysprice.eth}</p>
                                </div>
                                <div className="column">
                                    <p>1 LTC = ${this.state.threedaysprice.ltc}</p>
                                </div>
                            </div>
                        </div>
                        <div className="history--section__box__inner">
                            <h4>{this.state.fourdaysprice.date}</h4>
                            <div className="columns">
                                <div className="column">
                                    <p>1 BTC = ${this.state.fourdaysprice.btc}</p>
                                </div>
                                <div className="column">
                                    <p>1 ETH = ${this.state.fourdaysprice.eth}</p>
                                </div>
                                <div className="column">
                                    <p>1 LTC = ${this.state.fourdaysprice.ltc}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )
        }
    }

    export default History;