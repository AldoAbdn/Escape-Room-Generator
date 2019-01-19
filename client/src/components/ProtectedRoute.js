import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class ProtectedRoute extends Component {
    render(){
        if (this.props.authed === true){
            return (<Component {...this.props}/>)
        } else {
            return (<Redirect to='/login' state={this.props.location}/>)
        }
    }
}

export default ProtectedRoute;