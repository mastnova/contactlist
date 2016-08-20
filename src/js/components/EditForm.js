var React = require('react');
var AppActions = require('../actions/AppActions');

var EditForm = React.createClass({
  getInitialState: function() {
    return {
      name: this.props.contactToEdit.name,
      phone: this.props.contactToEdit.phone,
      email: this.props.contactToEdit.email
    }
  },

  componentWillReceiveProps: function(props) {
    this.setState({
      name: props.contactToEdit.name,
      phone: props.contactToEdit.phone,
      email: props.contactToEdit.email
    });
  },

  render: function() {
    return (
      <div className="well">
        <h3>Edit Contact</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              ref="name"
              onChange={this.handleChange.bind(this, 'name')}
              value={this.state.name}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              ref="phone"
              onChange={this.handleChange.bind(this, 'phone')}
              value={this.state.phone}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              ref="email"
              onChange={this.handleChange.bind(this, 'email')}
              value={this.state.email}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  },

  handleChange: function(fieldName, event) {
    var update = {};
    update[fieldName] = event.target.value;
    this.setState(update);
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var contact = {
      id: this.props.contactToEdit.id,
      name: this.refs.name.value.trim(),
      phone: this.refs.phone.value.trim(),
      email: this.refs.email.value.trim()
    }
    AppActions.updateContact(contact);
  }
})

module.exports = EditForm;
