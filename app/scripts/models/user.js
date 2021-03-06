var $ = require('jquery');
var Backbone = require('backbone');
var setUpParse = require('../parseUtilities.js').setUpParse;
var ParseModel = require('./parseModels.js').ParseModel;

var User = ParseModel.extend({
  defaults: {
    'first_name': '',
    'last_name': '',
    'email': '',
    'phone_number': '',
    'password': '',
    'username': '',
    'isAdmin': false
  },
  idAttribute: 'objectId',
  urlRoot: 'https://zugzwang.herokuapp.com/users',
  baseUrl: 'https://zugzwang.herokuapp.com/',
  login: function(username, password, callback){
    var url = this.baseUrl + 'login?username=' + username + '&password=' + encodeURI(password);
    var self = this;

    $.ajax(url).then(function(response){
      localStorage.setItem('sessionToken', response.sessionToken);
      localStorage.setItem('userSession', JSON.stringify(response));
      localStorage.setItem('userID', response.objectId);
      localStorage.setItem('name', response.first_name);

      setUpParse('zugzwang', 'tosche station', response.sessionToken);

      callback(response);
    });
  },
  signUp: function(callback){
    var self = this, url = this.baseUrl + 'users';
    console.log(this.get('email'));
    $.post(url, {
      'username': this.get('email'),
      'password': this.get('password'),
      'first_name': this.get('first_name'),
      'last_name': this.get('last_name'),
      'email': this.get('email'),
      'phone_number': this.get('phone_number'),
      'isAdmin': this.get('isAdmin')
    }).then(function(){
      self.login(self.get('username'), self.get('password'), callback);
    });
  },
},{
  logout: function(){
    var url = baseUrl + 'logout/';
    $.post(url).then(function(){
      localStorage.clear();
    });
  }
});

module.exports = {
  User: User
};
