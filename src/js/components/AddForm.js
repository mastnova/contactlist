var React = require('react');
var AppActions = require('../actions/AppActions.js');

var AddForm = React.createClass({
  render: function() {
    return (
      <div className="well">
        <h3>Add Contact</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input type="text" ref="name" className="form-control" placeholder="Add name..." />
          </div>
          <div className="form-group">
            <input type="text" ref="phone" className="form-control" placeholder="Add phone..." />
          </div>
          <div className="form-group">
            <input type="text" ref="email" className="form-control" placeholder="Add e-mail..." />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var contact = {
      name: this.refs.name.value.trim(),
      phone: this.refs.phone.value.trim(),
      email: this.refs.email.value.trim(),
    };
    AppActions.saveContact(contact);
  }
});

module.exports = AddForm;
