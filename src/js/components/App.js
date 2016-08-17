var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

function getAppState() {
  return {};
}

var App = React.createClass({

  getInitialState: function() {
    return getAppState();
  },

  componentDidMount: function() {
    AppStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onChange);
  },

  render: function(){
    return (
      <div>
        my app
      </div>
    )
  },

  _onChange: function() {
    this.setState(getAppStore());
  }

});

module.exports = App;
