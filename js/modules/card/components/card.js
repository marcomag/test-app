var React = require('react');

var Card = React.createClass({
	render: function(){
		this.props = this.props.attributes;
		var photoURL = 'https://farm' + this.props.farm + '.staticflickr.com/' + this.props.server + '/' + this.props.id + '_' + this.props.secret + '_n.jpg';
		var divStyle = {
			background: 'url(' + photoURL + ') center / cover'
		};
		return (
			<div className="demo-card-image mdl-card mdl-shadow--2dp" style={divStyle}>
			<div className="mdl-card__title mdl-card--expand"></div>
			<div className="mdl-card__actions">
			<span className="demo-card-image__filename">{this.props.title}</span>
			</div>
			</div>
		);
	}
});

module.exports = Card;
