// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Undervolt';
import CpuInfo from './CpuInfo';

const { dist } = require('cpu-benchmark');
const path = require('path');
const cluster = require('cluster');
const remote = require('electron').remote;
const isDev = require('electron-is-dev');

const app = remote.app;
let benchWorker = null;
let pids = [];

const productionPath = path.join(
  app.getAppPath(),
  'app',
  'extras',
  'cpuBench.js'
);
const developmentPath = 'app/extras/cpuBench.js';

let benchPath = '';

if (isDev) {
  benchPath = developmentPath;
} else {
  benchPath = productionPath;
}

cluster.setupMaster({
  exec: benchPath,
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
      for (var i = 0; i < cpuCount * 1; i += 1) {
        //Create benchmark thread
        benchWorker = cluster.fork();

        // Add worker pid to pid array
        pids.push(benchWorker.process.pid);

        cluster.on('online', function(worker) {
          console.log('WORKER: ' + worker.process.pid + ' is online');
        });

        // Send benchmark length to bench process
        benchWorker.send({ benchTime: Number(this.state.time * 1000) });

        // Disconnect from process when done
        benchWorker.disconnect();
      }
    }
  };

  endBench = () => {
    // Kill each process in pids array
    pids.forEach(pid => {
      console.log('killing', pid);
      process.kill(pid);
    });
    // Empty pids array
    pids = [];
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
          <h2>Stress Test</h2>
          <br />
          <br />
          <span>Benchmark Time in Seconds </span>
          <input
            style={{ maxWidth: '8rem' }}
            name="time"
            type="text"
            value={this.state.time}
            onChange={e => this.handleInputChange(e)}
          />
          <br />
          <br />
          <button style={{ marginRight: '1rem' }} onClick={this.cpuBench}>
            Start Benchmark
          </button>
          <button onClick={this.endBench}>Stop Benchmark</button>
          <br />
          <br />
          <br />
          <br />
          <CpuInfo />
        </div>
      </div>
    );
  }
}
