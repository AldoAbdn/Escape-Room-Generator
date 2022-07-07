import React, {Component} from 'react';
import { DragSource } from 'react-dnd';
import AreaDnDTarget from './AreaDnDTarget';
import '../styles/Component.css';
import { Card } from 'reactstrap';
import Area from '../../../client/src/models/Area';
import Modal from '../../../client/src/models/Modal';
import PropTypes from 'prop-types';

/**
 * Drag sources and drop targets only interact
 * if they have the same string type.
 * You want to keep types in a separate file with
 * the rest of your app's constants.
 */
const Types = {
  AREA: 'AREA'
};

/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
const areaSource = {
  /**
   * Determins if object can be draged based on props
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
    var item = null;
    if (props.id!==undefined){
       item = { id: props.id };
    } else {
       item = { component: props.component };
    }
    return item;
  },

  /**
   * Checks if component was dragged and didn't drop, check if user wants to delete
   * @param {object} props 
   * @param {Monitor} monitor 
   * @param {Component} component 
   */
  endDrag(props, monitor, component) {
    if (!monitor.didDrop() && component!=null) {
      props.showModal(new Modal("Warning", "Are you sure you want to delete this component?","Yes",component.removeComponent,"No",()=>{}));
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
 * Class for Area drag and drop source 
 * @extends Component
 * @author Alistair Quinn
 */
class AreaDnDSource extends Component{
  /** Creates AreaDnDSource */
  constructor(){
    super();
    this.state={render:true};
  }

  /** 
   * Removes a component 
   * @function 
   */
  removeComponent = () => {
    this.props.removeComponent(this.props.component._id);
    for(let id in this.props.component.outputComponents)
      this.props.removeComponent(id);
  }

  /** 
   * Adds a component 
   * @function 
   * @param {Component} component
   * @param {string} parentId
   */
  addComponent = (component,parentId) => {
    this.props.addComponent(component,this.props.component._id);
    this.props.addRelationship(component._id,parentId);
  }  

  /** 
   * React Lifecycle Method
   * Renders Layout
   * @returns {JSX}
   */
  render() {
    let target;
    if (this.props.isTarget){
      target = (
        <AreaDnDTarget findComponent={this.props.findComponent} handleComponentClick={this.props.handleComponentClick} outputComponents={this.props.outputComponents} component={this.props.component} showModal={this.props.showModal} addComponent={this.addComponent} updateComponent={this.props.updateComponent} removeComponent={this.props.removeComponent} addRelationship={this.props.addRelationship}/>
      );
    }
    let classNames;
    return this.props.connectDragSource(
        <div onClick={this.props.handleComponentClick(this.props.component)}>
          <Card className={classNames}>
            {target}
          </Card>
        </div>
    )
  }
};

AreaDnDSource.propTypes = {
  component: PropTypes.instanceOf(Area),
  isTarget: PropTypes.bool,
  removeComponent: PropTypes.func,
  addComponent: PropTypes.func,
  addRelationship: PropTypes.func,
  findComponent: PropTypes.func,
  handleComponentClick: PropTypes.func,
  outputComponents: PropTypes.array,
  showModal: PropTypes.func,
  updateComponent: PropTypes.func,
  connectDragSource: PropTypes.func,
}

export default DragSource(Types.AREA, areaSource, collect)(AreaDnDSource);