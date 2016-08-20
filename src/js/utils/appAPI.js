var Firebase = require('firebase');
var AppActions = require('../actions/AppActions');

var firebaseRef = new Firebase('https://contactlist-be77f.firebaseio.com/contacts');

module.exports = {
  saveContact: function(contact) {
    firebaseRef.push({
      contact: contact
    });
  },

  getContacts: function() {
    firebaseRef.once("value", function(snapshot) {
      var contacts = [];
      snapshot.forEach(function(childSnapshot) {
        var contact = {
          id: childSnapshot.key(),
          name: childSnapshot.val().contact.name,
          phone: childSnapshot.val().contact.phone,
          email: childSnapshot.val().contact.email
        };
        contacts.push(contact);
      });
      AppActions.receiveContacts(contacts);
    });
  },

  removeContact: function(contactId) {
    var firebaseRef = new Firebase('https://contactlist-be77f.firebaseio.com/contacts/'+contactId);
    firebaseRef.remove();
  },

  updateContact: function(contact) {
    var firebaseRef = new Firebase('https://contactlist-be77f.firebaseio.com/contacts/'+contact.id+'/contact');
    var updatedContact = {
      name: contact.name,
      phone: contact.phone,
      email: contact.email
    }
    firebaseRef.update(updatedContact);
  }
}
