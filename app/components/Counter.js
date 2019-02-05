// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Counter.css';
import routes from '../constants/routes';
import { rootPath } from 'electron-root-path';

const remote = require('electron').remote;
const app = remote.app;

var sudo = require('sudo-js');

export default class Counter extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      coreCacheValue: 0,
      gpuVoltage: 0,
      uncoreVoltage: 0,
      analogioVoltage: 0,
      password: '',
      path: '',
      path2: ''
    };
  }

  setVoltage = () => {
    var command = [
      'python',
      app.getPath('home') + '/undervolt.py',
      '--gpu',
      `-${Math.abs(Math.floor(this.state.gpuVoltage))}`,
      '--core',
      `-${Math.abs(Math.floor(this.state.coreCacheValue))}`,
      '--cache',
      `-${Math.abs(Math.floor(this.state.coreCacheValue))}`,
      '--uncore',
      `-${Math.abs(Math.floor(this.state.uncoreVoltage))}`,
      '--analogio',
      `-${Math.abs(Math.floor(this.state.analogioVoltage))}`
    ];

    console.log(command);
    sudo.exec(command, (err, pid, result) => {
      console.log(err);
      console.log(pid);
      console.log(result);
    });
  };

  readVoltage = () => {
    sudo.setPassword(this.state.password);

    var command = ['python', app.getPath('home') + '/undervolt.py', '--read'];

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
        gpuVoltage: '-' + formattedArray[5],
        uncoreVoltage: '-' + formattedArray[4],
        analogioVoltage: '-' + formattedArray[3]
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
        <div className="container">
          <h1>Undervolt Settings</h1>
          <span>Root Password </span>
          <br />
          <input
            name="password"
            type="password"
            className="centerText"
            onChange={e => this.handleInputChange(e)}
          />
          <br />
          <br />
          <button onClick={() => this.readVoltage()}>Read Voltages</button>
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
            <br />
            <br />
            <button onClick={() => this.setVoltage()}>Set Voltages</button>
          </div>
        </div>
      </div>
    );
  }
}
