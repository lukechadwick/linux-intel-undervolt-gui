import React, { Component } from 'react';
const si = require('systeminformation');

class CpuInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { cpuInfo: '', load: '', speed: '', temp: '', intervalID: 0 };
  }
  componentDidMount() {
    si.cpu()
      .then(data => {
        this.setState({ cpuInfo: data });
      })
      .catch(error => console.error(error));

    let intervalId = setInterval(() => {
      si.currentLoad().then(data => {
        this.setState({ load: data });
      });

      si.cpuCurrentspeed().then(data => {
        this.setState({ speed: data });
      });

      si.cpuTemperature()
        .then(data => {
          this.setState({ temp: data });
        })

        .catch(error => console.error(error));
    }, 1000);
    this.setState({ intervalId: intervalId });
  }
  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }
  render() {
    return (
      <React.Fragment>
        <h2>Processor Info:</h2>
        <br />
        <span>
          <b>CPU: </b>
        </span>
        <label>{this.state.cpuInfo.manufacturer}</label>
        <label>{this.state.cpuInfo.brand}</label>
        <br />
        <span>
          <b>Cores: </b>
        </span>
        <label>{this.state.cpuInfo.physicalCores} </label>
        <span>
          <b> Threads: </b>
        </span>
        <label>{this.state.cpuInfo.cores} </label>
        <br />
        <span>
          <b>Min Clock: </b>
        </span>
        <label>{this.state.cpuInfo.speedmin}GHz </label>
        <span>
          <b>Base Clock: </b>
        </span>
        <label>{this.state.cpuInfo.speed}GHz </label>
        <span>
          <b>Boost Clock: </b>
        </span>
        <label>{this.state.cpuInfo.speedmax}GHz</label>
        <br />
        <br />
        <span>
          <h2>
            Overall CPU Load:{' '}
            {Math.round(this.state.load.currentload * 10) / 10}%
          </h2>
          <h2>
            Current CPU Temp: {Math.round(this.state.temp.main * 10) / 10}°C
          </h2>
        </span>

        <br />
        <span>
          <b>Thread Usage: </b>
        </span>

        {this.state.load.cpus &&
          this.state.load.cpus.map((data, i) => {
            return (
              <React.Fragment>
                {i % 4 == 0 && <br />}
                <b> {i}: </b>
                <label key={i + 'cpu'}>{data.load.toFixed(1)}%</label>
              </React.Fragment>
            );
          })}
        <br />
        <br />
        <span>
          <b>Core Speeds: </b>
        </span>
        {this.state.speed.cores &&
          this.state.speed.cores.map((data, i) => {
            return (
              <React.Fragment>
                {i % 4 == 0 && <br />}
                <b> {i}: </b>
                <label key={i + 'speed'}>{data}GHz</label>
              </React.Fragment>
            );
          })}
      </React.Fragment>
    );
  }
}

export default CpuInfo;
