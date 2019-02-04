import React from 'react';
import { Link } from 'react-router-dom';

const ProfileActions = () => {
  return (
    <div className="btn-group mb-4" role="group">
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle fa-lg text-info mr-1" /> Edit Profile
      </Link>
      
      <Link to="/homes" className="btn btn-light">  
        <i className="fas fa-home fa-lg text-info mr-1"/>
       Book New Home
      </Link>
      <Link to="/booked-homes" className="btn btn-light">
        <i className="fas fa-shopping-cart fa-lg text-info mr-1"/>
       Your Bookings
      </Link>

    </div>
  );
};

export default ProfileActions;
