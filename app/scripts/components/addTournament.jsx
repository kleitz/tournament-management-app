var Backbone = require('backbone');
var React = require('react');
var Tournament = require('../models/tournament.js').Tournament;
var FileModel = require('../models/file.js').FileModel;

var AddTournamentContainer = React.createClass({
  getInitialState: function(){
    var tournament = new Tournament();
    var logo = new FileModel();

    return{
      'tournament': tournament,
      'tournament_name': '',
      'start_date': '',
      'end_date': '',
      'city': '',
      'state': '',
      'logo': logo
    }
  },
  handleInputChangeTournament: function(e){
    e.preventDefault();
    var target = e.target;

    this.state.tournament.set(target.name, target.value);
    this.setState({tournament: this.state.tournament});
  },
  handleTournamentSubmit: function(e){
    e.preventDefault();
    var self = this;

    this.state.logo.save().then(function(response){
      var tournament = self.state.tournament;
      var objectId = localStorage.getItem('userID');
      tournament.set('logo', response.url);
      tournament.set({"tournament_admin":{"__type":"Pointer", "className": "_User", "objectId": objectId}});
      tournament.createTournament();
    });



  },
  handleLogo: function(e){
    e.preventDefault();
    var attachedLogo = e.target.files[0];
    var logo = this.state.logo;

    logo.set('name', attachedLogo.name);
    logo.set('data', attachedLogo);

    this.setState({logo: logo});
  },
  render: function(){
    return(
      <div className="container">
        <div className="row">
          <form onSubmit={this.handleTournamentSubmit} encType="multipart/form-data" className="form col-sm-8 col-sm-offset-2" id="captain-sign-up">
            <h1>Create Your Tournament</h1>
            <div className="form-group">
              <label htmlFor="tournament_name">Tournament Name</label>
              <input onChange={this.handleInputChangeTournament} type="text" className="form-control" name="tournament_name" id="tournament_name" placeholder="Tournament Name" required="required"/>
              <label htmlFor="start_date">Start Date</label>
              <input onChange={this.handleInputChangeTournament} type="date" className="form-control" name="start_date" id="start_date" required="required"/>
              <label htmlFor="end_date">End Date</label>
              <input onChange={this.handleInputChangeTournament} type="date" className="form-control" name="end_date" id="end_date" required="required"/>
              <label htmlFor="city">Tournament City</label>
              <input onChange={this.handleInputChangeTournament} type="text" className="form-control" name="city" id="city" placeholder="city" required="required"/>
              <label htmlFor="state">Tournament State</label>
              <select onChange={this.handleInputChangeTournament} className="form-control" name="state" id="state" required="required">
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>
              <label htmlFor="tournament_logo">Tournament Logo</label>
              <input onChange={this.handleLogo} type="file" id="tournament_logo" name="tournament_logo"/>
            </div>
            <button type="submit" className="btn btn-default">Create Tournament</button>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = {
  AddTournamentContainer: AddTournamentContainer
};
