import React, { Component } from 'react';

import Home from './components/Home';
import Undervolt from './components/Undervolt';
import Benchmark from './components/Benchmark';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showVoltageSettings: false,
      showBenchmarkSettings: false,
      showHome: true
    };
  }

  showVoltageSettings = () => {
    this.setState({
      showVoltageSettings: !this.state.showVoltageSettings,
      showHome: !this.state.showHome
    });
  };

  showBenchmarkSettings = () => {
    this.setState({
      showBenchmarkSettings: !this.state.showBenchmarkSettings,
      showHome: !this.state.showHome
    });
  };

  render() {
    return (
      <div className="App">
        {this.state.showHome && (
          <Home
            showVoltageSettings={this.showVoltageSettings}
            showBenchmarkSettings={this.showBenchmarkSettings}
          />
        )}

        {this.state.showVoltageSettings && (
          <Undervolt showVoltageSettings={this.showVoltageSettings} />
        )}

        {this.state.showBenchmarkSettings && (
          <Benchmark showBenchmarkSettings={this.showBenchmarkSettings} />
        )}
      </div>
    );
  }
}

export default App;
