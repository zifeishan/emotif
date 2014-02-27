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
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  mood: []
  //mood is stored as an array of object, where each object is a date:score-array pair:
  //date: 2014-2-26
  //[1,2,0,3,4]
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
  addMood: function(date, score) {
    console.log('enter addMood');
    var moodArray = this.mood;
    // console.log(moodArray);
    // console.log('this');
    // console.log(this);
    var matchedMood = null;
    for (var i = moodArray.length - 1; i >= 0; i--) {
      var mood = moodArray[i];
      console.log('Mood');
      console.log(mood);
      if(mood.date == date) {
        matchedMood = mood
        break;
      }
    }
    if(matchedMood == null) {
      console.log('inject new date array');
      moodArray.push({
        date: date,
        score: [score]
      })
    } else {
      console.log('push score into existing array');
      console.log(mood.score);
      mood.score.push(score);
      console.log('After push:');
      console.log(mood.score);
    }
    this.markModified('mood');
    this.save(function(err, res) {
      console.log('Save error:');
      console.log(err);
      console.log(res.mood[0].score);
    });
    // this.mood.push({
    //   'time': time,
    //   'mood': score
    // });
    return this;
  },
};

mongoose.model('UserMood', UserMoodSchema);