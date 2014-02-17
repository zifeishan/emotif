'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Video = mongoose.model('Video'),
    requestify = require('requestify');

exports.getVideoByKeyword = function (req, res, bext) {
	//Now Google API just does not work, will figure out later.
	console.log('WORKS!!!!');
	var keyword = req.body.keyword;
	console.log(keyword);
	// var requestURL = 'https://www.googleapis.com/youtube/v3/search?' + 
	// 	'part=snippet' +
	// 	'&q=' + keyword +
	// 	'&type=video' +
	// 	'&key=' + '3f4cd2f88d78d60e4322c64636186e75e6c2ec19';
	var requestURL = 'https://gdata.youtube.com/feeds/api/standardfeeds/most_popular?key=AI39si4RF0Jazk_nsOaFR7Z_ufbiDU6m_PlYQB2hK4NnvaUszNQRL0nzZkYemjnzC6_YtfeyZBeR-T2Er0XSMrh_v-24eIlt7g';
	console.log(requestURL);
	requestify.get(requestURL).then(function(response) {
	    // Get the response body (JSON parsed - JSON response or jQuery object in case of XML response)
	    console.log(response.getBody());
	    // Get the response raw body
	    // console.log(response.body);
	});

	// GET {base_URL}/search?part=snippet
 //                     &q=YouTube+Data+API
 //                     &type=video
 //                     &videoCaption=closedCaption
 //                     &key={YOUR_API_KEY}
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