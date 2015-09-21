require('material-design-lite');
require('react');
require('backbone.radio');

Backbone.Radio.tuneIn('data');
Backbone.Radio.trigger('data', 'some:event');
