import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


class HomeItem extends Component {
  render() {
    const { home } = this.props;

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-3">
            <img src={home.houseImage} alt="" />
          </div>
          <div className="col-lg-7 col-md-7 col-8">
            <h3>{home.houseName}</h3>
            <p>{home.houseDescription.substring(0,150)}........</p>
            <br/>
            <h5>{home.houseLocation}</h5>
            <p><i>Home owned by {home.houseOwnerName}</i></p>
          </div>
          <div className="col-lg-2 col-md-2 col-8">
            <h5>Beds : {home.guestCapacity}</h5>
            <h6>{home.houseArea}sqft</h6>
            
            <h3>${home.housePrice}/Night</h3>
            <Link to={`/home/${home._id}`} className="btn btn-info">
              More Info
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

HomeItem.propTypes = {
  home: PropTypes.object.isRequired
};

export default HomeItem;
