var $ = require('jquery');
var React = require('react');

var Card = React.createClass({
	handleClick: function(event) {
		var rippler = $(event.currentTarget);
		var ink = rippler.find(".ink");

		// prevent quick double clicks
		ink.removeClass("animate");

		// set .ink diametr
		if(!ink.height() && !ink.width())
		{
			var d = Math.max(rippler.outerWidth(), rippler.outerHeight());
			ink.css({height: d, width: d});
		}

		// get click coordinates
		var x = event.pageX - rippler.offset().left - ink.width()/2;
		var y = event.pageY - rippler.offset().top - ink.height()/2;

		// set .ink position and add class .animate
		ink.css({
			top: y+'px',
			left:x+'px'
		}).addClass("animate");
	},
	render: function(){
		this.props = this.props.attributes;
		var photoURL = 'https://farm' + this.props.farm + '.staticflickr.com/' + this.props.server + '/' + this.props.id + '_' + this.props.secret + '_n.jpg';
		var divStyle = {
			background: 'url(' + photoURL + ') center / cover'
		};
		return (
			<div onClick={this.handleClick} className="demo-card-image mdl-card mdl-shadow--2dp ripple-effect" style={divStyle}>
				<div className="mdl-card__title mdl-card--expand"></div>
				<div className="mdl-card__actions">
					<span className="demo-card-image__filename">{this.props.title}</span>
				</div>
				<span className='ink'></span>
			</div>
		);
	}
});

module.exports = Card;
