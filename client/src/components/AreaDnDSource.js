import React, {Component} from 'react';
import { DragSource } from 'react-dnd';
import AreaDnDTarget from './AreaDnDTarget';
import '../styles/Component.css';
import { Card } from 'reactstrap';
import Modal from '../models/Modal';

// Drag sources and drop targets only interact
// if they have the same string type.
// You want to keep types in a separate file with
// the rest of your app's constants.
const Types = {
  AREA: 'AREA'
};

/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
const areaSource = {
  canDrag(props) {
    // You can disallow drag based on props
    return true;
  },

  isDragging(props, monitor) {
    // If your component gets unmounted while dragged
    // (like a card in Kanban board dragged between lists)
    // you can implement something like this to keep its
    // appearance dragged:
    return monitor.getItem().id === props.id;
  },

  beginDrag(props, monitor, component) {
    // Return the data describing the dragged item
    var item = null;
    if (props.id!==undefined){
       item = { id: props.id };
    } else {
       item = { component: props.component };
    }
    return item;
  },

  endDrag(props, monitor, component) {
    if (!monitor.didDrop() && component!=null) {
      props.showModal(new Modal("Warning", "Are you sure you want to delete this component?","Yes",component.removeComponent,"No",()=>{}));
      return;
    }
  }
};

/**
 * Specifies which props to inject into your component.
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

class AreaDnDSource extends Component{
  removeComponent = ()=>{
    this.props.removeComponent(this.props.component._id);
  }
  addComponent = (component,parentId)=>{
    this.props.addComponent(component,this.props.component._id);
    this.props.addRelationship(component._id,parentId);
  }  
  render() {
    console.log('area-render');
    var target;
    if (this.props.isTarget){
      target = (
        <AreaDnDTarget findComponent={this.props.findComponent} handleComponentClick={this.props.handleComponentClick} outputComponents={this.props.outputComponents} component={this.props.component} showModal={this.props.showModal} addComponent={this.props.addComponent} updateComponent={this.props.updateComponent} removeComponent={this.props.removeComponent} addRelationship={this.props.addRelationship}/>
      );
    }

    return this.props.connectDragSource(
        <div onClick={this.props.handleComponentClick(this.props.component)}>
          <Card className={"component"}>
            {this.props.id}
            {target}
          </Card>
        </div>
    )
  }
};

export default DragSource(Types.AREA, areaSource, collect)(AreaDnDSource);