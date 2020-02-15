import React, { Component } from 'react';
import { Route } from 'react-router'
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Class for ProtectedRoute
 * @extends Component
 * @author Alistair Quinn
 */
class ProtectedRoute extends Component {
  /** 
   * React Lifecycle Method
   * Renders Layout
   * @returns {JSX}
   */
    render(){
        if (window.localStorage.getItem('feathers-jwt')){
            if(this.props.condition!==undefined){
                if(!this.props.condition){
                    return(<Redirect to={this.props.redirect} state={this.props.location}/>)
                } else {
                    return (<Route {...this.props}/>)
                }
            } else {
                return (<Route {...this.props}/>)
            }
        } else {
            return (<Redirect to='/login' state={this.props.location}/>)
        }
    }
}

ProtectedRoute.propTypes = {
    condition: PropTypes.bool,
    location: PropTypes.string,
}

export default ProtectedRoute;