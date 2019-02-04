import React from 'react';
import { Link } from 'react-router-dom';

const OwnerProfileActions = () => {
  return (
    <div className="btn-group mb-4" role="group">
      
      <Link to="/owner-homes" className="btn btn-light">
        <i className="fas fa-home text-info" /> Your Homes
        
      </Link>
      <Link to="/add-homes" className="btn btn-light">
        <i className="fas fa-plus-square text-info" /> Add Home
        
      </Link>
     

    </div>
  );
};

export default OwnerProfileActions;
