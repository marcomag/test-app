var $ = require('jquery'),
Backbone = require('backbone'),
React = require('react'),
Listing = require('./modules/listing/components/infinite.js'),
PhotoCollection = require('./modules/data/photos.js');
require('material-design-lite');
require('backbone.radio');

Backbone.Radio.tuneIn('data');

// Render listing component
$.when(Backbone.Radio.request("data", "photo:entities")).done(function(data) {
	React.render(<Listing photos={data.models} />, document.getElementById('page_content'));
});
