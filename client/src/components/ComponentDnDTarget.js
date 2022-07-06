import React, {Component}  from 'react';
import { Card, CardBody, UncontrolledTooltip } from 'reactstrap';
import { DropTarget } from 'react-dnd';
import { Area, Puzzle, Event, Music, Lock, Prop } from '../../../client/src/models/index';
import PropTypes from 'prop-types';
import '../styles/Component.css';

/**
 * Drag sources and drop targets only interact
 * if they have the same string type.
 * You want to keep types in a separate file with
 * the rest of your app's constants.
 */
const Types = {
    COMPONENT: 'COMPONENT'
}

/**
 * Specifies the drop target contract.
 * All methods are optional.
 */
const componentTarget = {
    drop(props,monitor,component){
        if (monitor.didDrop()){
            return;
        }
        const item = monitor.getItem();
        const isInput = props.isInput;
        component.handleComponentDrop(item,isInput);
        return {moved:true};
    }
}

/**
 * Specifies which props to inject into your component.
 * @param {Connect} connect
 * @param {Monitor} monitor
 * @returns {object} Props
 */
function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({shallow:true}),
        canDrop: monitor.canDrop(),
        itemType: monitor.getItemType()
    }
}

/**
 * Class for Component drag and drop target for components 
 * @extends Component
 * @author Alistair Quinn
 */
class ComponentDnDTarget extends Component {
    /**
     * Handles Component Drop
     * @param {Component} item 
     * @param {bool} isInput 
     */
    handleComponentDrop(item,isInput=true){
        var component = null;
        if (item.id!==undefined){
            switch(item.id){
                case 'Puzzle':
                    component = new Puzzle();
                    break;
                case 'Lock':
                    component = new Lock();
                    break;
                case 'Event':
                    component = new Event();
                    break;
                case 'Music':
                    component = new Music();
                    break;
                case 'Prop':
                    component = new Prop();
                    break;
                default:
                    return;
            }
            this.props.addComponent(component,this.props.component._id);
        } else {
            component = item;
            if(component._id!==this.props.component._id)
                this.props.addRelationship(component._id,this.props.component._id,isInput);
        }
    }

    /** 
     * React Lifecycle Render
     * @returns {JSX}
     */
    render() {
        let id=this.props.component._id;
        var classNames = "hide-border";
        if(this.props.isOver && this.props.canDrop){
            classNames+=" canDrop";
        } else if(this.props.isOver && !this.props.canDrop){
            classNames+=" cantDrop";
        } else if(this.props.canDrop){
            classNames+=" couldDrop";
        }
        let tooltip;
        if(this.props.isInput){
            id+="-input"
            classNames+=" isInput";
            tooltip = "Drag another component to this blue square to add it as an input to this component"
        }
        else {
            id+="-output"
            classNames+=" isOutput";
            tooltip = "Drag another component to this green square to add it as an output of this component"
        }
        return this.props.connectDropTarget(
            <div key={this.props.component._id} id={id}>
                <Card className={classNames} onClick={this.props.handleComponentClick(this.props.component)}>
                    <CardBody>

                    </CardBody>
                </Card>
                <UncontrolledTooltip target={id}>{tooltip}</UncontrolledTooltip>
            </div>
        )
    }
};

ComponentDnDTarget.propTypes = {
    addComponent: PropTypes.func,
    component: PropTypes.instanceOf(Area),
    isOver: PropTypes.bool,
    canDrop: PropTypes.bool,
    isInput: PropTypes.bool,
    handleComponentClick: PropTypes.func
}

export default DropTarget(Types.COMPONENT, componentTarget, collect)(ComponentDnDTarget);