import React, {Component} from 'react';
import { DragSource } from 'react-dnd';
import AreaDnDTarget from './AreaDnDTarget';

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
    if (props.id!=undefined){
       item = { id: props.id };
    } else {
       item = { area: props.area };
    }
    return item;
  },

  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      alert('did not drop');
      const item = monitor.getItem();
      component.props.handleDidNotDrop(props.component);
      return;
    }

    // When dropped on a compatible target, do something.
    // Read the original dragged item from getItem():
    const item = monitor.getItem();

    // You may also read the drop result from the drop target
    // that handled the drop, if it returned an object from
    // its drop() method.
    const dropResult = monitor.getDropResult();

    // This is a good place to call some Flux action;
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
    render() {
      var target;
      if (this.props.isTarget){
        target = (
          <AreaDnDTarget component={this.props.component} handleDidNotDrop={this.props.handleDidNotDrop} handleComponentDrop={this.props.handleComponentDrop} handleComponentClick={this.props.handleComponentClick}/>
        );
      }
      return this.props.connectDragSource(
          <div style={{width:'100px',height:'100px'}}>
          {this.props.id}
          {target}
          </div>
      )
    }
};

export default DragSource(Types.AREA, areaSource, collect)(AreaDnDSource);