'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Video = mongoose.model('Video'),
    requestify = require('requestify'),
    youtube = require('youtube-feeds');

var shuffle_deck_size = 50;

exports.getVideoByKeyword = function (req, res, bext) {
	// // Using Google's request API
	// var keyword = req.body.keyword;
	// console.log(keyword);
	// var requestURL = 'https://www.googleapis.com/youtube/v3/search?' + 
	// 	'part=snippet' +
	// 	'&q=' + keyword +
	// 	'&type=video' +
	// 	'&key=' + '3f4cd2f88d78d60e4322c64636186e75e6c2ec19';
	// console.log(requestURL);
	// requestify.get(requestURL).then(function(response) {
	//     // Get the response body (JSON parsed - JSON response or jQuery object in case of XML response)
	//     console.log(response.getBody());
	// });
  var keyword = req.body.keyword;

  //Using youtube-feeds for nodejs
  //Docs here: https://github.com/fvdm/nodejs-youtube
  var query_body = {
    q: keyword,
    'max-results': shuffle_deck_size,
    orderby: 'viewCount'
  };
  youtube.feeds.videos( query_body, function(err, result) {
    if(err) {
      console.log(err);
      res.json({success: false, message: 'Video Retrival Error'});
    }
    var result_size = result.items.length;
    console.log(result_size);
    var return_index = Math.floor(Math.random() * result_size);
    console.log(return_index);
    var video = result.items[return_index];
    var return_json = {
      id: video.id,
      title: video.title
    };
    res.json(return_json);
  });
};

exports.getVideoByPopularity = function (req, res, next) {
  var random = Math.random();
  if(random < 0.5) {
    console.log('Show todays most popular');
    youtube.feeds.standard('US/most_popular_Comedy', {time: 'today'}, function(err, result) {
      if(err) {
        console.log(err);
        res.json({success: false, message: 'Video Retrival Error'});
      }
      var result_size = result.items.length;
      console.log(result_size);
      var return_index = Math.floor(Math.random() * result_size);
      console.log(return_index);
      var video = result.items[return_index];
      var return_json = {
        id: video.id,
        title: video.title
      };
      res.json(return_json);
    });
  } else {
    youtube.feeds.standard('US/most_popular_Comedy', function(err, result) {
      console.log('Show all time most popular');
      if(err) {
        console.log(err);
        res.json({success: false, message: 'Video Retrival Error'});
      }
      var result_size = result.items.length;
      console.log(result_size);
      var return_index = Math.floor(Math.random() * result_size);
      console.log(return_index);
      var video = result.items[return_index];
      var return_json = {
        id: video.id,
        title: video.title
      };
      res.json(return_json);
    });
  }
};

exports.getVideoByTopic = function (req, res, next) {
	//TODO
};

exports.getVideoByChannel = function (req, res, next) {
	//TODO
};

exports.getVideoFromDatabase = function (req, res, next) {
	console.log('Count database');
	var totalNumber = 10;
	var vid = Math.floor(totalNumber * Math.random()) + 1;
	Video.find({vid: vid}, function (err, video) {
	if (err) return next(new Error('Failed to load Video'));
    if (video.length) {
      res.json(video[0]);
      console.log(video[0]);
	}
  });
};