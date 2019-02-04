import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import IndHomeItem from './IndHomeItem';
import Spinner from '../common/Spinner';


import { getHomeByHomeId } from '../../actions/homeActions';

class Home extends Component {
  componentDidMount() {
    if (this.props.match.params._id) {
      this.props.getHomeByHomeId(this.props.match.params._id);
    }
  }


  render() {
    const { homes, loading } = this.props.home;
    let profileContent;

    if (homes === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              
            </div>
            <div className="col-md-6" />
          </div>
          
          <IndHomeItem homes={homes} /> 
          
          
        </div>
      );
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  getHomeByHomeId: PropTypes.func.isRequired,
  home: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  home: state.home
});



export default connect(mapStateToProps, { getHomeByHomeId })(Home);
