// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Undervolt';

const { dist } = require('cpu-benchmark');
const path = require('path');
const cluster = require('cluster');
const remote = require('electron').remote;

const app = remote.app;

const benchPath = path.join(app.getAppPath(), 'app', 'extras', 'cpuBench.js');

let benchWorker = null;

cluster.setupMaster({
  exec: benchPath,
  //args: ['--use', 'https'],
  silent: false
});

export default class Benchmark extends Component {
  constructor(props) {
    super(props);
    this.state = { time: '' };
  }

  cpuBench = () => {
    if (cluster.isMaster) {
      // Count the machine's CPUs
      var cpuCount = require('os').cpus().length;

      // Create a worker for each CPU
      for (var i = 0; i < cpuCount * 2; i += 1) {
        //Create benchmark thread
        benchWorker = cluster.fork();

        cluster.on('online', function(worker) {
          console.log('WORKER: ' + worker.process.pid + ' is online');
        });

        // Send benchmark length to bench process
        console.log(this.state.time * 1000);

        benchWorker.send({ benchTime: Number(this.state.time * 1000) });

        // Close process when done
        benchWorker.disconnect();
      }
      // Code to run if we're in a worker process
    }
  };

  endBench = () => {
    console.log(benchWorker);
    //Code to kill bench proess
    // ,,,
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className={styles.container} data-tid="container">
        <a
          onClick={() => {
            this.props.showBenchmarkSettings();
          }}
        >
          <i className="fa fa-arrow-left fa-3x" />
        </a>
        <div className="container">
          <h2>Bench</h2>
          <span>Bench Time in Seconds </span>
          <input
            name="time"
            type="text"
            value={this.state.time}
            onChange={e => this.handleInputChange(e)}
          />
          <br />
          <br />
          <button onClick={this.cpuBench}>Bench</button>
          <button onClick={this.endBench}>Stop Bench</button>
        </div>
      </div>
    );
  }
}
