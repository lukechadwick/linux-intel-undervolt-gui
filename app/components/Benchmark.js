// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Undervolt';
const { dist } = require('cpu-benchmark');

var path = require('path');
var cluster = require('cluster');
let benchWorker = null;

const remote = require('electron').remote;
const app = remote.app;

cluster.setupMaster({
  exec: path.join(process.resourcesPath, 'app/cpuBench.js'),
  //args: ['--use', 'https'],
  silent: false
});

export default class Benchmark extends Component {
  constructor(props) {
    super(props);
    this.state = { path: '' };
  }

  cpuBench = () => {
    if (cluster.isMaster) {
      // Count the machine's CPUs
      this.setState({
        path: path.join(process.resourcesPath, 'app/cpuBench.js')
      });

      var cpuCount = require('os').cpus().length;

      // Create a worker for each CPU
      for (var i = 0; i < cpuCount * 2; i += 1) {
        //Create benchmark thread
        benchWorker = cluster.fork();

        cluster.on('online', function(worker) {
          console.log('WORKER: ' + worker.process.pid + ' is online');
        });

        // Send benchmark length to bench process
        benchWorker.send({ benchTime: 10000 });

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
        <input name="path" type="text" value={this.state.path} />
        <div className="container">
          <h2>Bench</h2>

          <button onClick={this.cpuBench}>bench</button>
          <br />
          <br />

          <button onClick={this.endBench}>stop bench</button>
        </div>
      </div>
    );
  }
}
