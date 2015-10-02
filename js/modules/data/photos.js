var $ = require('jquery');
var Backbone = require('backbone');
require('backbone.radio');

var PhotoCollection = Backbone.Collection.extend({
    url: "https://api.flickr.com/services/rest/?&method=flickr.people.getPublicPhotos&api_key=bbe6aa739ed8d4f2e922193fa6ebe4c5&format=json&user_id=36587311@N08&per_page=500",
    sync : function(method, collection, options) {
        options.dataType = "jsonp";
        options.jsonpCallback = "jsonFlickrApi";
        return Backbone.sync(method, collection, options);
    },
    parse: function(response) {
        return response.photos.photo;
    }
});

// API interface
var API = {
    // return object
    getPhotoEntities: function () {
        var photos = new PhotoCollection(),
        defer = $.Deferred();

        photos.fetch({
            success: function (data) {
                defer.resolve(data);
            },
            error: function () {
                defer.resolve(undefined);
            }
        });

        return defer.promise();
    }
};

Backbone.Radio.reply("data", "photo:entities", function (options) {
    return API.getPhotoEntities(options);
});

//module.exports = PhotoCollection;
