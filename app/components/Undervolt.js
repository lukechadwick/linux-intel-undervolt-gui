// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Undervolt.css';
const isDev = require('electron-is-dev');
const sudo = require('sudo-js');

const productionPath = process.resourcesPath + '/app/extras/undervolt.py';
const developmentPath = 'app/extras/undervolt.py';

let resPath = '';

if (isDev) {
  resPath = developmentPath;
} else {
  resPath = productionPath;
}

export default class Undervolt extends Component<Props> {
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
    sudo.setPassword(this.state.password);

    var command = [
      'python',
      resPath,
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
    sudo.exec(command, (err, pid, result) => {
      console.log(err);
      console.log(result);
    });
  };

  readVoltage = () => {
    sudo.setPassword(this.state.password);

    var command = ['python', resPath, '-r'];

    sudo.exec(command, (err, pid, result) => {
      if (err) console.log(err);
      console.log(result);

      if (result) {
        let formattedArray = [];

        //Split result into array by line
        let resultArray = result.split('\n');

        ///Remove text/strings/symbols from voltage numbers
        resultArray.forEach(element => {
          formattedArray.push(element.replace(/[^\d\.]*/g, ''));
        });

        // Find indexes
        let coreIndex = resultArray.findIndex(element =>
          element.includes('core')
        );
        let analogioIndex = resultArray.findIndex(element =>
          element.includes('analogio')
        );
        let uncoreIndex = resultArray.findIndex(element =>
          element.includes('uncore')
        );
        let gpuIndex = resultArray.findIndex(element =>
          element.includes('gpu')
        );

        this.setState({
          coreCacheValue: '-' + formattedArray[coreIndex],
          gpuVoltage: '-' + formattedArray[gpuIndex],
          uncoreVoltage: '-' + formattedArray[uncoreIndex],
          analogioVoltage: '-' + formattedArray[analogioIndex]
        });
      }
    });
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <div className={styles.backButton} data-tid="backButton">
          <a
            onClick={() => {
              this.props.showVoltageSettings();
            }}
          >
            <i className="fa fa-arrow-left fa-3x" />
          </a>
        </div>
        <div className="container">
          <h1>Undervolt Settings</h1>
          <span>Root Password </span>
          <br />
          <input
            name="password"
            type="password"
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
