// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Counter.css';
import routes from '../constants/routes';

var sudo = require('sudo-js');
let pass = '';

export default class Counter extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      coreCacheValue: 0,
      gpuVoltage: 0,
      uncoreVoltage: 0,
      analogioVoltage: 0,
      password: ''
    };
  }

  readVoltage = () => {
    sudo.setPassword(this.state.password);

    var command = [
      'python',
      '/home/luke/workspace/undervolt-gui/undervolt/undervolt.py',
      '-r'
    ];

    sudo.exec(command, (err, pid, result) => {
      let formattedArray = [];
      let resultArray = result.split('\n'); //Split result into array by line

      resultArray.forEach(element => {
        console.log(element);
        formattedArray.push(element.replace(/[^\d\.]*/g, '')); //Remove text/strings from voltage numbers
      });

      formattedArray = formattedArray.filter(Boolean); //Remove blank lines
      this.setState({
        coreCacheValue: '-' + formattedArray[1],
        gpuVoltage: '-' + formattedArray[2],
        uncoreVoltage: '-' + formattedArray[3],
        analogioVoltage: '-' + formattedArray[4]
      });
    });
  };

  handleInputChange = e => {
    console.log(event.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <div className={styles.backButton} data-tid="backButton">
          <Link to={routes.HOME}>
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
        </div>
        <br />
        <br />

        <h1>Undervolt Settings</h1>
        <span>Root Password </span>

        <br />
        <input
          name="password"
          type="password"
          onChange={e => this.handleInputChange(e)}
        />

        <button onClick={() => this.readVoltage()}>Read</button>
        <div className="slidecontainer">
          <p>Core/Cache Voltage:</p>
          <input
            name="coreCacheValue"
            type="range"
            min="-250"
            max="0"
            value={this.state.coreCacheValue}
            onChange={e => this.handleInputChange(e)}
          />
          <span> {this.state.coreCacheValue} mv</span>

          <p>GPU Voltage:</p>
          <input
            name="gpuVoltage"
            type="range"
            min="-250"
            max="0"
            value={this.state.gpuVoltage}
            onChange={e => this.handleInputChange(e)}
          />
          <span> {this.state.gpuVoltage} mv</span>

          <p>Uncore Voltage:</p>
          <input
            name="uncoreVoltage"
            type="range"
            min="-250"
            max="0"
            value={this.state.uncoreVoltage}
            onChange={e => this.handleInputChange(e)}
          />
          <span> {this.state.uncoreVoltage} mv</span>

          <p>Analog IO Voltage:</p>
          <input
            name="analogioVoltage"
            type="range"
            min="-250"
            max="0"
            value={this.state.analogioVoltage}
            onChange={e => this.handleInputChange(e)}
          />
          <span> {this.state.analogioVoltage} mv</span>
        </div>

        <div className={styles.btnGroup} />
      </div>
    );
  }
}
