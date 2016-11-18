var React = require('react');
var User = require('../models/user.js').User;
var Backbone = require('backbone');

var TeamAdminSignUpContainer = React.createClass({
  getInitialState: function(){
    var teamAdmin = new User();
    return{
      'teamAdmin': teamAdmin,
      'first_name': '',
      'last_name': '',
      'email': '',
      'phone_number': '',
      'username': '',
      'password': '',
    };
  },
  handleInputChangeAdmin: function(e){
    e.preventDefault();
    var target = e.target;

    var newState = {};
    newState[target.name] = target.value;
    this.setState(newState);

    this.state.teamAdmin.set(target.name, target.value);
    this.state.teamAdmin.set('username', this.state.teamAdmin.get('email'));
    this.setState({admin: this.state.teamAdmin});
  },
  handleAdminSubmit: function(e){
    e.preventDefault();

    this.state.teamAdmin.signUp();

    this.setState({
      'first_name': '',
      'last_name': '',
      'email': '',
      'phone_number': '',
      'username': '',
      'password': ''
    });

    Backbone.history.navigate('/tournaments/'+this.props.tournamentId+'/add-team/', {trigger: true});
  },
  render: function(){
    return(
      <div className="container">
        <div className="row">
          <div className="col-sm-8 col-sm-offset-2">
            <form onSubmit={this.handleAdminSubmit} className="form" id="captain-sign-up">
              <h1>Sign up to register your team</h1>
              <div className="form-group">
                <label htmlFor="first_name">First Name</label>
                <input onChange={this.handleInputChangeAdmin} type="text" className="form-control" name="first_name" id="first_name" placeholder="First Name" value={this.state.first_name}/>
                <label htmlFor="last_name">Last Name</label>
                <input onChange={this.handleInputChangeAdmin} type="text" className="form-control" name="last_name" id="last_name" placeholder="Last Name" value={this.state.last_name}/>
                <label htmlFor="phone_number">Contact Number</label>
                <input onChange={this.handleInputChangeAdmin} type="text" className="form-control" name="phone_number" id="phone_number" placeholder="(###) ###-####" value={this.state.phone_number}/>
                <label htmlFor="email">Email</label>
                <input onChange={this.handleInputChangeAdmin} type="email" className="form-control" name="email" id="email" placeholder="Enter email" value={this.state.email}/>
                <label htmlFor="password">Password</label>
                <input onChange={this.handleInputChangeAdmin} type="password" className="form-control" name="password" id="password" placeholder="Password" value={this.state.password}/>
              </div>
              <button type="submit" className="btn btn-default">Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = {
  TeamAdminSignUpContainer: TeamAdminSignUpContainer
};