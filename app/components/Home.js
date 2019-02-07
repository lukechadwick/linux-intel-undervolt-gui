// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.css';

var path = require('path');
var cluster = require('cluster');

cluster.setupMaster({
  exec: path.join(__dirname, 'cpuBench.js'),
  //args: ['--use', 'https'],
  silent: false
});

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  cpuBench = () => {
    if (cluster.isMaster) {
      // Count the machine's CPUs
      var cpuCount = require('os').cpus().length;

      // Create a worker for each CPU
      for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
      }
      // Code to run if we're in a worker process
    }
  };

  endBench = () => {
    console.log(cluster.workers);

    //cluster.workers.kill();
  };
  render() {
    return (
      <div className={styles.container} data-tid="container">
        <h2>Home</h2>
        <a
          onClick={() => {
            this.props.showVoltageSettings();
          }}
        >
          to Voltage Control
        </a>
        {/* <Link to={routes.COUNTER}>to Voltage Control</Link> */}
        <a />
        <br />
        <button onClick={this.cpuBench}>bench</button>
        <button onClick={this.endBench}>stop bench</button>
      </div>
    );
  }
}
