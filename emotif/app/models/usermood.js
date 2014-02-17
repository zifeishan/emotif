'use strict';

var mongoose = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator'),
    Schema = mongoose.Schema;
  
var authTypes = ['github', 'twitter', 'facebook', 'google'],
    SALT_WORK_FACTOR = 10;

/**
 * User Schema
 */
var UserMoodSchema = new Schema({
  email: {
    type: String,
    unique: true
  },
  mood: [] 
  // time, score
});


/**
 * Plugins
 */
UserMoodSchema.plugin(uniqueValidator,  { message: 'Value is not unique.' });

/**
 * Pre-save hook
 */
UserMoodSchema
  .pre('save', function(next) {
    console.log('Saving new table!');
    // if (!this.isNew) return next(); 
    // What is next?
    console.log(this.isNew);
    if (!this.isNew) return next();
    else
      next();

  });

/**
 * Methods
 */
UserMoodSchema.methods = {
  addMood: function(time, score) {
    this.mood.push({
      'time': time,
      'mood': score
    });
    return this;
    // return this.encryptPassword(plainText) === this.hashedPassword;
  },
};

mongoose.model('UserMood', UserMoodSchema);