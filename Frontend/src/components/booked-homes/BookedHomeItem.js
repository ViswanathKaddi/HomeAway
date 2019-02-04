import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';


class BookedHomeItem extends Component {

  render() {
    const { ownerhome } = this.props;

    return (
      
        <div className="row">
          <div className="col-3">
            <div className="row">
                <div className="col-2">
                    <i className="fas fa-globe text-info mr-1" />
                </div>
                <div className="col-10 text-left">
                    <p>{ownerhome.houseName}</p>
                </div>
           
            </div>
          </div>
          <div className="col-2 text-center">
            <p>{ownerhome.guestCapacity} guests</p>
          </div>
          <div className="col-2 text-center">
            <p>{ownerhome.houseLocation}</p>
          </div>
          
          <div className="col-2 text-center">
          <p>${parseFloat(Math.round((ownerhome.housePrice + Number(ownerhome.housePrice)*0.1 + 50) * 100) / 100).toFixed(2)} <small><i>inc. taxes</i></small></p>
          </div>
          <div className="col-2 text-center">
          <Moment format="MMM DD, YYYY"><p>{ownerhome.houseBookedDate}</p></Moment>
          </div>
          <div className="col-1">
            
          </div>
        </div>
      
    );
  }
}

BookedHomeItem.propTypes = {
  ownerhome: PropTypes.object.isRequired
};

export default BookedHomeItem;
