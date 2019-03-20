import React, {Component} from 'react';
import { DragSource } from 'react-dnd';
import '../styles/Component.css';

// Drag sources and drop targets only interact
// if they have the same string type.
// You want to keep types in a separate file with
// the rest of your app's constants.
const Types = {
  COMPONENT: 'COMPONENT'
};

/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
const componentSource = {
  beginDrag(props, monitor, component) {
    // Return the data describing the dragged item
    var item = {id: props.id}
    return item;
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

class PalletItem extends Component{
  render() {
      let id=this.props.id || "";
      let classNames = id + " " + "component" + " " + "pallet-item"
      return this.props.connectDragSource(
          <div className={classNames} id={id} >
            <span>{id}</span>
          </div>
      )
  }
};

export default DragSource(Types.COMPONENT, componentSource, collect)(PalletItem);