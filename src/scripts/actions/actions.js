/** @jsx React.DOM */
var Reflux = require('reflux');
var request = require('superagent');

var actions = Reflux.createActions({
    'listenToAlerts': {},
    'toggleStatus': {},
    'addAlert': {}
});

actions.toggleStatus.preEmit = function(alert) {
    console.log('toggleStatus');
    console.log(alert);
    request.put('http://localhost:3000/'+alert._id, alert, function () {console.log("done")});

}
actions.addAlert.preEmit = function (alert) {
    console.log(alert)
    request.post('http://localhost:3000', alert, function () {console.log("done")});
};

module.exports = actions;
