var App = require('./components/App');
var React = require('react');
var ReactDOM = require('react-dom');
var appAPI = require('./utils/appAPI.js');

appAPI.getContacts();

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
