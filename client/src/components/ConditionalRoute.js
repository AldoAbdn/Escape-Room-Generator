import React, { Component } from 'react';
import { Navigate, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Class for ProtectedRoute
 * @extends Component
 * @author Alistair Quinn
 */
class ConditionalRoute extends Component {
  /** 
   * React Lifecycle Method
   * Renders Layout
   * @returns {JSX}
   */
    render(){
        if(!this.props.condition){
            return(<Navigate to={this.props.redirect}/>)
        } else {
            return (<Route {...this.props}/>)
        }
    }
}

ConditionalRoute.propTypes = {
    condition: PropTypes.bool,
    redirect: PropTypes.string,
}

export default ConditionalRoute;