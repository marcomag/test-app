var React = require('react'),
Infinite = require('react-infinity'),
Card = require('../../card/components/card.js');

var List = React.createClass({
	render: function(){
		return (
			<Infinite data={this.props.photos}
				elementWidth={230}
				elementHeight={322}
				margin={19}
				mobileWidth={320}
				childComponent={React.createFactory(Card)}
				/>
		);
	}
});

module.exports = List;
