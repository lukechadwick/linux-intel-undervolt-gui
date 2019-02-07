import React, { Component } from 'react';

import Home from './components/Home';
import Counter from './components/Undervolt';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showVoltageSettings: false,
      showHome: true
    };
  }

  showVoltageSettings = () => {
    this.setState({
      showVoltageSettings: !this.state.showVoltageSettings,
      showHome: !this.state.showHome
    });
  };

  render() {
    return (
      <div className="App">
        {this.state.showHome && (
          <Home showVoltageSettings={this.showVoltageSettings} />
        )}

        {this.state.showVoltageSettings && (
          <Counter showVoltageSettings={this.showVoltageSettings} />
        )}
      </div>
    );
  }
}

export default App;
