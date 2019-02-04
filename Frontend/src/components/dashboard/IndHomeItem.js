import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class IndHomeItem extends Component {

onbookHomeClick(home) {
    //this.props.bookThisHome(home);
    axios
      .post('http://localhost:3001/bookhome', home)
      .then(function(res) { 
          if (res.data) {
            alert("Your Booking Successful")
            window.location = "/booked-homes"
          } 
})
      
}

  render() {
    const { homes} = this.props;

    

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
        <div className="col-8">
            <img src={homes.houseImage} alt="" />
        </div>
        <div className="col-4 text-left">
            <div className="card card-body text-light bg-dark mb-3 text-center">
                <h4>{homes.houseName}</h4>
            </div>
            <br/>
            <div className="row">
                <div className="col-6 text-left">
                    <h3>${homes.housePrice}.... </h3>
                    <h5>${parseFloat(Math.round(Number(homes.housePrice*0.1) * 100) / 100).toFixed(2)}.... </h5>
                    <h5>$50....</h5>
                    <h3>${parseFloat(Math.round((homes.housePrice + Number(homes.housePrice)*0.1 + 50) * 100) / 100).toFixed(2)}....</h3>
                </div>

                <div className="col-6 text-right">
                    <h3>per night</h3>
                    <h5>tax </h5>
                    <h5>cleaning</h5>
                    <h3>Total</h3>
                </div>
               
            </div>
            <br/>
            <br/>
            <div className="row">
                <div className="col-12 text-center">
                    
                    <button 
                    type="submit" 
                    onClick={this.onbookHomeClick.bind(this, homes)} 
                    className="btn btn-success btn-lg btn-block"
                    >
                    Book now
                    </button>
                </div>
            </div>

            <br/>

            <div className="row">
                <div className="col-12 text-center">
                    <Link to={'/homes'} className="btn btn-primary btn-lg btn-block">
                        Back
                    </Link>
                </div>
            </div>
        </div>  
        </div>
        
        <br/>
        <div className="row">
          <div className="col-lg-8 col-md-8 text-center">
            <p><i>Home owned by {homes.houseOwnerName}</i></p>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-lg-3 col-md-3 text-center">
            <h5><i className="fas fa-map-marker-alt"/> {homes.houseLocation}</h5>
          </div>
          <div className="col-lg-3 col-md-3 text-center">
            <h5><i className="fas fa-bed fa-lg"/> {homes.guestCapacity} persons</h5>
          </div>
          <div className="col-lg-3 col-md-3 text-center">
             <h5><i className="fas fa-bath fa-lg"/> 2 bath</h5>
          </div>
          <div className="col-lg-3 col-md-3 text-center">
            <h5><i className="fas fa-home"/> {homes.houseArea}sqft</h5>
          </div>
        </div> 
        <br/>
        
        <div className="row">
            <div className="col-lg-12 col-md-12">
                <p>{homes.houseDescription}</p>
            </div>  
        </div>
    </div>
      
    );
  }
}

IndHomeItem.propTypes = {
  bookThisHome: PropTypes.func.isRequired,
  home: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    home: state.home
  });
  
  
  
export default connect( mapStateToProps)(IndHomeItem);

