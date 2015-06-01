/** @jsx React.DOM */
var React         = require('react');
// routing
var Router        = require('react-router');
var RouteHandler  = Router.RouteHandler;
var Route         = Router.Route;
var DefaultRoute  = Router.DefaultRoute;
// view components
var ViewAlert    = require('./components/view');
var AddAlert     = require('./components/add');
var Alerts       = require('./components/alerts');

var routes = (
  <Route handler={ AlertManager }>
  <Route name="alert" path="/alert/:id" handler={ ViewAlert } />
  <Route name="add" path="/add" handler={ AddAlert } />
  <DefaultRoute name="home" handler={ Alerts } />
  </Route>
);

var AlertManager = React.createClass({
  render: function() {
    return (
      <RouteHandler/>
    );
  }
});

Router.run(routes, function(Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});
