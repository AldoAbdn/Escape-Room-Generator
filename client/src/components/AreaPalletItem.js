import React, {Component} from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import { DragSource } from 'react-dnd';
import PropTypes from 'prop-types';
import '../styles/Component.css';

// Drag sources and drop targets only interact
// if they have the same string type.
// You want to keep types in a separate file with
// the rest of your app's constants.
const Types = {
  AREA: "AREA"
};

/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
const componentSource = {
  /**
   * Return the data describing the dragged item
   * @param {object} props 
   * @param {Monitor} monitor 
   * @param {Component} component
   * @returns {object} 
   */
  beginDrag(props, monitor, component) {
    // Return the data describing the dragged item
    var item = {id: props.id}
    return item;
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
 * Class for AreaPalletItem
 * @extends Component
 * @author Alistair Quinn 
 */
class AreaPalletItem extends Component{
  /** 
   * React Lifecycle Render
   * Renders Layout
   * @returns {JSX}
   */
  render() {
      let id=this.props.id || "";
      let classNames = id + " component pallet-item"
      return this.props.connectDragSource(
          <div className={classNames} id={id} >
            <p>{id}</p>     
            <UncontrolledTooltip target={id}>{this.descriptions[id]}</UncontrolledTooltip>
          </div>
      )
  }
};

AreaPalletItem.propTypes = {
  id: PropTypes.string,
}

export default DragSource(Types.AREA, componentSource, collect)(AreaPalletItem);