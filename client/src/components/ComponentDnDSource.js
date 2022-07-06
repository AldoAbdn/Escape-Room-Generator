import React, {Component} from 'react';
import { DragSource } from 'react-dnd';
import ComponentDnDTarget from './ComponentDnDTarget';
import { Row, Col } from 'reactstrap'
import '../styles/Component.css';
import Modal from '../../../client/src/models/Modal';
import PropTypes from 'prop-types';

/**
 * Drag sources and drop targets only interact
 * if they have the same string type.
 * You want to keep types in a separate file with
 * the rest of your app's constants.
 */
const Types = {
  COMPONENT: 'COMPONENT'
};

/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
const componentSource = {
  /**
   * Determins if object can be dragged based on props
   * @param {object} props 
   * @returns {bool}
   */
  canDrag(props) {
    return true;
  },

  /**
   * If your component gets unmounted while dragged
   * (like a card in Kanban board dragged between lists)
   * you can implement something like this to keep its
   * appearance dragged:
   * @param {object} props 
   * @param {Monitor} monitor 
   * @returns {bool} 
   */
  isDragging(props, monitor) {
    return monitor.getItem().id === props.id;
  },

  /**
   * Return the data describing the dragged item
   * @param {object} props 
   * @param {Monitor} monitor 
   * @param {Component} component
   * @returns {object} 
   */
  beginDrag(props, monitor, component) {
    // Return the data describing the dragged item
    var item = {...props.component};
    return item;
  },

  /**
   * Checks if component was dragged and didn't drop, check if user wants to delete
   * @param {object} props 
   * @param {Monitor} monitor 
   * @param {Component} component 
   */
  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      if((props.component!==undefined||props.component!==null)&&props.showModal)
        props.showModal(new Modal("Warning", "Are you sure you want to delete this component?","Yes",()=>(component.props.removeComponent(props.component._id)),"No",()=>{}));
        return;
    }
  }
};

/**
 * Specifies which props to inject into your component.
 * @param {Connect} connect
 * @param {Monitor} monitor
 * @returns {object} Props
 */
function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging()
  };
}

/**
 * Class for Component drag and drop source
 * @extends Component
 * @author Alistair Quinn
 */
class ComponentDnDSource extends Component{
  /** 
   * React Lifecycle Render
   * @returns {JSX}
   */
  render() {
      let id=`${this.props.component._id}`;
      var style = {};
      let classNames = "component container-fluid";
      if(this.props.component!==undefined){
        style.top = this.props.component.position.top;
        style.left = this.props.component.position.left;
        classNames += " " + this.props.component.type + " " + this.props.component._id;
      } 
      return this.props.connectDragSource(
          <div className={classNames} key={id} id={id} style={style} onClick={this.props.handleComponentClick(this.props.component)}>
            <Row>
              <Col>
                <p>{this.props.component.type}</p>
                <p>{this.props.component._id}</p>
              </Col>
            </Row>
            <Row>
              <Col>
              <p>{this.props.component.name}</p>
              </Col>
            </Row>
            <Row>
                <Col xs="6"><ComponentDnDTarget isInput={true} component={this.props.component} handleComponentClick={this.props.handleComponentClick} addComponent={this.props.addComponent} addRelationship={this.props.addRelationship}/></Col>
                <Col xs="6"><ComponentDnDTarget isInput={false} component={this.props.component} handleComponentClick={this.props.handleComponentClick} addComponent={this.props.addComponent} addRelationship={this.props.addRelationship}/></Col>
            </Row>
          </div>
      )
  }
};

ComponentDnDSource.propTypes = {
  removeComponent: PropTypes.func,
  component: PropTypes.instanceOf(Component),
  handleComponentClick: PropTypes.func,
  showModal: PropTypes.func,
  addComponent: PropTypes.func,
  addRelationship: PropTypes.func,
}

export default DragSource(Types.COMPONENT, componentSource, collect)(ComponentDnDSource);