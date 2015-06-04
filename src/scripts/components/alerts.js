/** @jsx React.DOM */
var React       = require('react');
var Reflux      = require('reflux');
var AlertsStore = require('../stores/alertsStore');
var actions     = require('../actions/actions');
var Spinner     = require('../components/spinner');

var Link = require('react-router').Link;

var Alerts = React.createClass({

  mixins: [
    Reflux.listenTo(AlertsStore, 'onAlertsUpdate')
  ],

  getInitialState: function() {
  var alertsData = AlertsStore.getDefaultData();
  return {
    loading: true,
    alerts: alertsData
  };
  },
/*
  statics: {

    willTransitionTo: function(transition, params) {
      actions.listenToAlerts();
    }
  },
*/
  componentDidMount: function() {
    console.log(this.props.profile)
    actions.listenToAlerts(this.props.profile.email);
  },

  onAlertsUpdate: function(alertsData) {
  this.setState({
    loading: false,
    alerts: alertsData
  });
  },

  render: function() {
    var rows = this.state.alerts.map(function(alert, i) {
    return (
    <tr key={i}>
    <td>{alert.name}</td>
    <td>{alert.code}</td>
    <td>{alert.email}</td>
    <td>{alert.active}</td>
    </tr>
    )
  });

  return (
  <div>
  <table className="table table-striped">
    <thead>
    <tr>
    <th>Name</th>
    <th>Code</th>
    <th>Email</th>
    <th>Active?</th>
    </tr>
    </thead>
    <tbody>
    {   rows }
    </tbody>
  </table>
  </div>
  )
  }
});

module.exports = Alerts;
