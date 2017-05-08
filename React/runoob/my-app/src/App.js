import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p>可以在App.js里修改，这里的语法高亮在sublime是不对的，因为在js里嵌入了html代码</p>
        <p>在VSCode里语法高亮正确！</p>
      </div>
    );
  }
}

export default App;
