/**
 * Connects redux state and actions to the whole app,
 * makes sure routing is possible,
 * @class App
 * @author Alistair Quinn  
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import '../styles/App.css';
import Main from './Main';
import * as userActionCreators from '../actions/user';
import * as escapeRoomsActionCreators from '../actions/escapeRooms';
import * as escapeRoomActionCreators from '../actions/escapeRoom';
import * as modalActionCreators from '../actions/modal';

function mapStateToProps(state) {
  return {
    redux: state
  }
}

function mapDispatchToProps(dispatch){
  const user = bindActionCreators(userActionCreators, dispatch);
  const escapeRooms = bindActionCreators(escapeRoomsActionCreators, dispatch);
  const escapeRoom = bindActionCreators(escapeRoomActionCreators, dispatch);
  const modal = bindActionCreators(modalActionCreators, dispatch);
  return {user, escapeRooms, escapeRoom, modal};
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return {
    ...ownProps,
    redux: {
      state: stateProps.redux,
      actions: dispatchProps
    }
  }
}

const App = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Main);

export default withRouter(App);
