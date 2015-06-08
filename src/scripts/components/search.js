var React = require('react/addons');
var Reflux = require('reflux');

var actions = require('../actions/actions');
var ItemStore = require('../stores/itemStore');
var Button = require('react-bootstrap').Button;
var Input = require('react-bootstrap').Input;

var SelectedItem = React.createClass({
  handleClick: function(e) {
    console.log('button clicked');
    this.props.addAlert();
  },
  render: function() {
    return (
      <div className="selected-div center-block">
        <div className="display-div" title={this.props.item.name}>
            <img src={this.props.item.url} border="0" alt={this.props.item.name} title={this.props.item.name} class="zoomMousePointer"/>
        </div>
        <div className="pull-right">
            <Button onClick={this.handleClick} disabled={this.props.item.disabled}>Add Alert</Button>
        </div>
        <div className="clearfix"/>
      </div>
    );
  }
});

var Search = React.createClass({

  mixins: [
    Reflux.listenTo(ItemStore, 'onItemUpdate')
  ],

  getInitialState: function() {
    var itemData = ItemStore.getDefaultData();

    return {
      query: '',
      item: itemData
    }
  },

  validationState: function() {
    var length = this.state.query.length;
    if (length >= 8) { return 'success'; }
    else if (length > 0) { return 'error'; }
  },

  handleChange: function() {
    this.setState({
      query: this.refs.searchInput.getValue()
    });
    actions.retrieveItem(this.state.query);
  },

  onItemUpdate: function(itemData) {
    var newState = React.addons.update(this.state, {
      item: {$set: itemData}
    });
    this.setState(newState);
  },

  addAlert: function() {
    console.log('add Alert parent');
    var alert = {};
    alert.name = this.state.item.name;
    alert.code = this.state.query;
    alert.email = this.props.profile.email;
    alert.active = 'Yes';
    // Add code + email
    actions.addAlert(alert);
  },

  render: function() {
    console.log(this.state.item)
    return (
        <div>
            <div className="search-box">
                <div className="query-div center-block">
                    <Input
                        type='text'
                        value={this.props.query}
                        placeholder='Create an alert for...'
                        help='e.g. 00173901'
                        bsStyle={this.validationState()}
                        hasFeedback
                        ref='searchInput'
                        groupClassName='group-class'
                        labelClassName='label-class'
                        onChange={this.handleChange} />
                </div>
            </div>
        <SelectedItem item={this.state.item} addAlert={this.addAlert}/>
      </div>
    );
  }
});
module.exports = Search;
