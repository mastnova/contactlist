var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppAPI = require('../utils/appAPI.js');

var CHANGE_EVENT = 'change';

var _contacts = [];

var AppStore = assign({}, EventEmitter.prototype, {
  saveContact: function(contact) {
    _contacts.push(contact);
  },

  getContacts: function() {
    return _contacts;
  },

  emitChange: function(){
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    this.on('change', callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  },
  setMovies: function(movies) {
    _movies = movies;
  },
  getMovies: function() {
    return  _movies;
  },

});

AppDispatcher.register(function(payload) {
  var action = payload.action;
  switch(action.actionType) {
    case AppConstants.SAVE_CONTACT:

      AppStore.saveContact(action.contact);
      break;
    default:
      return true;
  }
  AppStore.emitChange();
  return true;
})

module.exports = AppStore;
