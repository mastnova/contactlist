var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppAPI = require('../utils/appAPI.js');

var CHANGE_EVENT = 'change';

var _contacts = [];
var contact_to_edit = '';

var AppStore = assign({}, EventEmitter.prototype, {
  saveContact: function(contact) {
    _contacts.push(contact);
  },

  getContacts: function() {
    return _contacts;
  },

  setContacts: function(contacts) {
    _contacts = contacts;
  },

  removeContact: function(contactId) {
    _contacts = _contacts.filter(function(contact){
      if (contact.id === contactId) {
        return false;
      }
      return true;
    });
  },

  setContactToEdit: function(contact) {
    contact_to_edit = contact;
  },

  getContactToEdit: function() {
    return contact_to_edit;
  },

  updateContact: function(contact) {
    _contacts = _contacts.map(function(el) {
      if (el.id === contact.id) {
        el = contact;
      }
      return el;
    });
  },

  emitChange: function(){
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }

});

AppDispatcher.register(function(payload) {
  var action = payload.action;
  switch(action.actionType) {
    case AppConstants.SAVE_CONTACT:
      AppStore.saveContact(action.contact);
      AppAPI.saveContact(action.contact);
      break;
    case AppConstants.RECEIVE_CONTACTS:
      AppStore.setContacts(action.contacts);
      break;
    case AppConstants.REMOVE_CONTACT:
      AppStore.removeContact(action.contactId);
      AppAPI.removeContact(action.contactId);
      break;
    case AppConstants.EDIT_CONTACT:
      AppStore.setContactToEdit(action.contact);
      break;
    case AppConstants.UPDATE_CONTACT:
      AppStore.updateContact(action.contact);
      AppStore.setContactToEdit('');
      AppAPI.updateContact(action.contact);
      break;
    default:
      return true;
  }
  AppStore.emitChange();
  return true;
})

module.exports = AppStore;
