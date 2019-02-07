// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.css';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
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
        <br />
        <br />
        <a
          onClick={() => {
            this.props.showBenchmarkSettings();
          }}
        >
          to Benchmark Settings
        </a>
      </div>
    );
  }
}
