var React = require('react');
var actions = require('../actions/actions');

var SearchBox = React.createClass({

  doSearch:function(){
    var query = this.refs.searchInput.getDOMNode().value; // this is the search text
    this.props.doSearch(query);
  },

  render:function(){
    return <input type="text" ref="searchInput" placeholder="Search Name" value={this.props.query} onChange={this.doSearch}/>
  }
});

var DisplayItem = React.createClass({

  handleClick: function(e) {
    this.props.addAlert();
  },

  render: function(){
    var url = 'http://www.ikea.com/sg/en/catalog/products/'+this.props.query;
    //returning the iframe
    if (this.props.query && this.props.query.length >= 8) {
      return (
        <div>
          <iframe src={url}></iframe>
          <button onClick={this.handleClick} type="button" class="btn btn-default btn-lg">
            <span class="glyphicon glyphicon-star" aria-hidden="true"></span> Add Alert
          </button>
        </div>
      );
    } else {
      return (
        <p>preview here</p>
      );
    }
  }
});

var Search = React.createClass({
  getInitialState: function() {
    return {
      alert: {
        name: '',
        code: '',
        email: this.props.profile.email,
        active: 'Yes'
      },
      errors: {},
      query: ''
    }
  },
  doSearch:function(queryText){
    console.log(queryText);
    var thisAlert = this.state.alert;
    thisAlert.code = queryText;
    this.setState({
      query: queryText,
      alert: thisAlert
    })
  },
  addAlert: function(){
    console.log(this.state.alert);
    actions.addAlert(this.state.alert);
    this.setState({
      query: ''
    })
  },
  render:function(){
    return (
      <div className="Search">
        <SearchBox query={this.state.query} doSearch={this.doSearch}/>
        <DisplayItem query={this.state.query} addAlert={this.addAlert}/>
      </div>
    );
  }
});
module.exports = Search;
