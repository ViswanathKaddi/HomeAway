import React from 'react'

function BookedHomeListHeading() {
  return (
    <div>
    <p className="lead text-left">              
        <i>These are the homes you have booked in the past</i>
    </p>
    <br/>
    <div className="row">
    
    <div className="col-3">
      <div className="row">
          <div className="col-2">   
              
          </div>
          <div className="col-10 text-left">
              <strong>Home Name</strong>
          </div>
     
      </div>
    </div>
    <div className="col-2 text-center">
        <strong>Guest Capacity</strong>
    </div>
    <div className="col-2 text-center">
       <strong>City</strong>
    </div>
    
    <div className="col-2 text-center">
        <strong>You Paid</strong>
    </div>
    <div className="col-2 text-center">
        <strong>Booked On</strong>
    </div>
    <div className="col-1">
      
    </div>
  </div>
  <br/>
  </div>
  )
}

export default BookedHomeListHeading;