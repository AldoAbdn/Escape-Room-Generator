import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import '../styles/App.css';
import Main from './Main';
import mapUserDispatchToProps from '../actions/users';
import mapEscapeRoomDispatchToProps from '../actions/escapeRooms';


function mapStateToProps(state) {
  return {
    reduxState: state
  }
}

function mapDispatchToProps(dispatch, {services}){
  const userFuncs = mapUserDispatchToProps(dispatch, services);
  const escapeRoomFuncs = mapEscapeRoomDispatchToProps(dispatch, services);
  return {...userFuncs, ...escapeRoomFuncs};
}

const App = connect(mapStateToProps, mapDispatchToProps)(Main);

export default withRouter(App);
