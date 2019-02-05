// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Home.css';

var sudo = require('sudo-js');
let pass = '';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  readVoltage = () => {
    var command = [
      'python',
      '/home/luke/workspace/undervolt-gui/undervolt/undervolt.py',
      '-r'
    ];

    sudo.exec(command, function(err, pid, result) {
      console.log(result);
    });
  };

  handleInputChange = event => {
    sudo.setPassword(event.target.value);
  };

  render() {
    return (
      <div className={styles.container} data-tid="container">
        <h2>Home</h2>
        <Link to={routes.COUNTER}>to Counter</Link>
        <button onClick={() => this.readVoltage()}>Read</button>
        <input type="password" onChange={e => this.handleInputChange(e)} />
      </div>
    );
  }
}
