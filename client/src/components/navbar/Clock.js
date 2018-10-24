import React, { Component } from "react";

export default class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = { time: new Date().toLocaleString() };
  }

  tick() {
    this.setState({
      time: new Date().toLocaleString()
    });
  }

  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  render() {
    return <p className="App-clock my-auto">{this.state.time}</p>;
  }
}
