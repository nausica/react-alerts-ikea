/** @jsx React.DOM */
var Reflux = require('reflux');
var _ = require('lodash');
var actions = require('../actions/actions');
var request = require('superagent');

var _item = {};

var itemStore  = Reflux.createStore({

  init: function() {
    _item = {
        url: '',
        name: ''
      };
    // register listenToItem function
    this.listenTo(actions.retrieveItem, this.retrieveItem);
  },

  // returns the private array of alerts
  getDefaultData: function() {
    return _item;
  },

  //
  retrieveItem: function(param) {
    var self = this;
    request
    .get('http://localhost:3000/item/'+param)
    .set({ Accept: 'application/json' })
    .end(function(response) {
      _item = response.body;
      self.trigger(_item);
    })
  }

});

module.exports = itemStore;
