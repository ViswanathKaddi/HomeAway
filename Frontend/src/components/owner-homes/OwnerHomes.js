import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import OwnerHomeItem from './OwnerHomeItem';
import OwnerHomeListHeading from './OwnerHomeListHeading';
import { getOwnerHomes } from '../../actions/homeActions';

class OwnerHomes extends Component {
    componentDidMount() {
        this.props.getOwnerHomes();
      }
    
      render() {
        const { ownerhomes } = this.props.home;
        let homeItems, headings;
        
        if (ownerhomes === null) {
            homeItems = <h4 style={{textAlign:'center', paddingBottom:'214px'}}>No homes have been added by the Owner</h4>;
        } else {
            
         if (ownerhomes.length > 0) {
            
            headings=<OwnerHomeListHeading/>
            homeItems = ownerhomes.map(ownerhome => (
               
                <div>
                    
                    <OwnerHomeItem key={ownerhome._id} ownerhome={ownerhome} />
              </div>
            ));
            
          } else {
            homeItems = <h5>You have not added any homes</h5>;
          }
          
        }
        
    
        return (
          <div className="homes">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  
                  


                  <div className="row">
                  <div className="col-8">
                    <h3 className="display-8 text-left">Owner Dashboard</h3>
                  </div>
                  <div className="col-2">
                    <Link to="/add-homes" className="btn btn-light">
                        <i className="fas fa-home text-info mr-1" />
                        Add Home
                    </Link>
                  </div>
                  <div className="col-2">
                    <Link to="/ownerdashboard" className="btn btn-light float-right" >
                        <i className="fas fa-plane text-info mr-1" />
                        Owner Dashboard
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
    
    OwnerHomes.propTypes = {
      getOwnerHomes: PropTypes.func.isRequired,
      home: PropTypes.object.isRequired
    };
    
    const mapStateToProps = state => ({
      home: state.home
    });
    
    export default connect(mapStateToProps, { getOwnerHomes })(OwnerHomes);


