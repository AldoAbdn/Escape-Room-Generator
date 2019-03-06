import React, { Component } from 'react';
import { Route } from 'react-router'
import { Redirect } from 'react-router-dom';

class ProtectedRoute extends Component {
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

export default ProtectedRoute;