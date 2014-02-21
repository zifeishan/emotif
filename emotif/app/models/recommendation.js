'use strict';

var mongoose = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator'),
    Schema = mongoose.Schema;

/**
 * Video Schema
 */
var RecommendationSchema = new Schema({
  rectype: {
    type: String,
    enum: ['video', 'photo', 'talk']
  },
  url: String,
  content: String,
  title: String,
  shown_time: Number,
  liked_time: Number,
  better_time: Number
});

mongoose.model('Recommendation', RecommendationSchema);