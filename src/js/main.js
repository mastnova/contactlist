var App = require('./components/App');
var React = require('react');
var ReactDOM = require('react-dom');
var appAPI = require('./utils/appAPI.js');

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
