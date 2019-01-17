import React, { Component } from 'react';

class PrivateRoute extends Component {
    render(){
        if (this.props.authed === true){
            return (<Component {...this.props}/>)
        } else {
            return (<Redirect to=[{pathname:'/login', state:{from:this.props.location}}]/>)
        }
    }
}