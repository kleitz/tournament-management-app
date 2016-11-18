var Backbone = require('backbone');
var ParseModel = require('./parseModels.js').ParseModel;
var ParseCollection = require('./parseModels.js').ParseCollection;

var Team = ParseModel.extend({
  urlRoot: 'https://zugzwang.herokuapp.com/classes/Teams'
});

var TeamCollection = ParseCollection.extend({
  model: Team,
  baseUrl: 'https://zugzwang.herokuapp.com/classes/Teams',
});

module.exports = {
  Team: Team,
  TeamCollection: TeamCollection
};
