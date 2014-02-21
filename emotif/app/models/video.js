'use strict';

var mongoose = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator'),
    Schema = mongoose.Schema;

/**
 * Video Schema
 */
var VideoSchema = new Schema({
  vid: {
    type: Number,
    unique: true
  },
  video_id: String,
  caption: String
});


mongoose.model('Video', VideoSchema);