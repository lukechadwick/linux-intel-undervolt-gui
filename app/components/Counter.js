// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Counter.css';
import routes from '../constants/routes';

export default class Counter extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      voltage: 0
    };
  }

  handleInputChange = e => {
    console.log(event.target.value);

    this.setState({ voltage: event.target.value });

    // /output.innerHTML = this.value;
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

        <h1>Custom Range Slider</h1>

        <div class="slidecontainer">
          <p>Default range slider:</p>
          <input
            type="range"
            min="-250"
            max="0"
            value={this.state.voltage}
            onChange={e => this.handleInputChange(e)}
          />

          <p>Custom range slider:</p>
          <input
            type="range"
            min="1"
            max="100"
            value="50"
            class="slider"
            id="myRange"
          />
        </div>

        <div className={styles.btnGroup} />
      </div>
    );
  }
}
