import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BookedHomeItem from './BookedHomeItem';
import BookedHomeListHeading from './BookedHomeListHeading';
import { getBookedHomes } from '../../actions/homeActions';


class BookedHomes extends Component {
    componentDidMount() {
        this.props.getBookedHomes();
      }
    
      render() {
        const { bookedhomes } = this.props.home;
        let homeItems, headings;
        
        if (bookedhomes === null) {
            homeItems = <h4 style={{textAlign:'center', paddingBottom:'214px'}}>You have not booked any homes</h4>;
        } else {
            
         if (bookedhomes.length > 0) {
            
            headings=<BookedHomeListHeading/>
            homeItems = bookedhomes.map(ownerhome => (
               
                <div>
                    
                    <BookedHomeItem key={ownerhome._id} ownerhome={ownerhome} />
              </div>
            ));
            
          } else {
            homeItems = <h5>You have not booked any homes</h5>;
          }
          
        }
        
    
        return (
          <div className="homes">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  
                  


                  <div className="row">
                  <div className="col-8">
                    <h3 className="display-8 text-left">Your Booked Homes</h3>
                  </div>
                  <div className="col-2">
                    <Link to="/homes" className="btn btn-light float-right" >
                        <i className="fas fa-home text-info mr-1" />
                        Book Home
                    </Link>
                  </div>
                  <div className="col-2">
                    <Link to="/dashboard" className="btn btn-light float-right" >
                        <i className="fas fa-plane text-info mr-1" />
                        Traveller Dashboard
                    </Link>
                  </div>
                </div>
                <br/>

                
                  {headings}              
                  {homeItems}
                  <br/>
                  <br/> 
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
    
    BookedHomes.propTypes = {
      getBookedHomes: PropTypes.func.isRequired,
      home: PropTypes.object.isRequired
    };
    
    const mapStateToProps = state => ({
      home: state.home
    });
    
    export default connect(mapStateToProps, { getBookedHomes })(BookedHomes);


