import React, { Component } from 'react';
import PropTypes from 'prop-types';


class OwnerHomeItem extends Component {

  render() {
    const { ownerhome } = this.props;

    return (
      
        <div className="row">
          <div className="col-3">
            <div className="row">
                <div className="col-2">
                    <i className="fas fa-home text-info mr-1" />
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
            <p>{ownerhome.houseArea}sqft</p>
          </div>
          <div className="col-2 text-center">
            <p>{ownerhome.housePrice}/night</p>
          </div>
          <div className="col-1">
            
          </div>
        </div>
      
    );
  }
}

OwnerHomeItem.propTypes = {
  ownerhome: PropTypes.object.isRequired
};

export default OwnerHomeItem;
