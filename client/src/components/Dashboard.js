import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
    mapEscapeRoomToList(escapeRoom,i){
        return <li key={i}>i</li>
    }
    componentDidMount(){
        const user = this.props.redux.state.user;
        //Get User Details and Update Redux Store
        this.props.services.escapeRooms.find({userId:user._id})
        .then((queryResult)=>{
            if(queryResult.action.type.includes('FULFILLED')){
                const escapeRooms = queryResult.value.data[0];
                this.props.redux.actions.updateEscapeRoom(escapeRooms);
            }
        });
    }
    render() {
        return (
            <div className="main container">
                <p>Dashboard</p>
                {this.props.redux.state.escapeRooms.map(this.mapEscapeRoomToList)}
            </div>
        )
    }
};

export default Dashboard;