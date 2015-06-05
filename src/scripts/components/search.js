var React = require('react/addons');
var Reflux = require('reflux');

var actions = require('../actions/actions');
var ItemStore = require('../stores/itemStore');
var Button = require('react-bootstrap').Button;
var Input = require('react-bootstrap').Input;

var SelectedItem = React.createClass({
  handleClick: function(e) {

  },
  render: function() {
    return (
      <div>
        <img src={this.props.item.url} border="0" alt={this.props.item.name} title={this.props.item.name} width="300" height="200" class="zoomMousePointer"/>
        <Button onClick={this.handleClick} bsStyle='primary'>Add Alert</Button>
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

  render: function() {
    console.log(this.state.item)
    return (
      <div>
        <Input
            type='text'
            value={this.props.query}
            placeholder='Enter code here'
            //label='Working example with validation'
            help='e.g. 00173901'
            bsStyle={this.validationState()}
            hasFeedback
            ref='searchInput'
            groupClassName='group-class'
            labelClassName='label-class'
            onChange={this.handleChange} />
        <SelectedItem item={this.state.item}/>
      </div>
    );
  }
});
module.exports = Search;
