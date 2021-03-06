import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup'


class OwnerLogin extends Component {
    constructor(){
        super();
        this.state={
            email:'',
            password:'',
            errors:{}
    
        };
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }

    componentDidMount() {
      if (this.props.auth.isAuthenticated) {
        this.props.history.push('/ownerdashboard');
      }
    }

componentWillReceiveProps(nextProps){
  if (nextProps.auth.isAuthenticated) {
    this.props.history.push('/ownerdashboard');
  }

  if(nextProps.errors){
      this.setState({errors: nextProps.errors});
    }
}
    
onChange(e){
    this.setState({[e.target.name]:e.target.value});
}
    
onSubmit(e){
        e.preventDefault();
    
        const userData={
               
            email:this.state.email,
            password:this.state.password
        };
        console.log(userData);
        this.props.loginUser(userData);
    }
  render() {
    const {errors}=this.state;

    return (
        <div className="login">
        <div className="container">
        <br/>
        <br/>
          <div className="row">
            <div className="col-md-5 m-auto">
              <h2 className="display-8 text-center">Owner Login</h2>
              
              <p className="lead text-center">Sign in to your HomeAway Owner account</p>
              <br/>
              <form onSubmit={this.onSubmit}>

              <TextFieldGroup
                type="email"   
                placeholder="Email Address" 
                name="email"
                value={this.state.email} 
                onChange={this.onChange}
                error={errors.email}
              />

              <TextFieldGroup
                type="password"   
                placeholder="Password" 
                name="password"
                value={this.state.password} 
                onChange={this.onChange}
                error={errors.password}
              />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>

              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

OwnerLogin.propTypes ={
  loginUser:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  errors:PropTypes.object.isRequired
}

const mapStateToProps=(state) => ({
  auth:state.auth,
  errors:state.errors
});

export default connect(mapStateToProps, {loginUser}) (OwnerLogin);