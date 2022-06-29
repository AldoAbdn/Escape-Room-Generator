/**
 * Connects redux state and actions to the whole app
 * makes sure routing is possible
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

/**
 * Maps state to props
 * @param {object} state 
 */
function mapStateToProps(state) {
  return {
    redux: state
  }
}

/**
 * Maps dispatch to props
 * @param {object} dispatch 
 */
function mapDispatchToProps(dispatch){
  const user = bindActionCreators(userActionCreators, dispatch);
  const escapeRooms = bindActionCreators(escapeRoomsActionCreators, dispatch);
  const escapeRoom = bindActionCreators(escapeRoomActionCreators, dispatch);
  const modal = bindActionCreators(modalActionCreators, dispatch);
  return {user, escapeRooms, escapeRoom, modal};
}

/**
 * 
 * @param {object} stateProps 
 * @param {object} dispatchProps 
 * @param {object} ownProps 
 */
function mergeProps(stateProps, dispatchProps, ownProps) {
  return {
    ...ownProps,
    redux: {
      state: stateProps.redux,
      actions: dispatchProps
    }
  }
}

/** Main App Component */
const App = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Main);

/** App with Router */
export default withRouter(App);
