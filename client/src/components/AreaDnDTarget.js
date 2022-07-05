import React, {Component}  from 'react';
import ReactDOM from 'react-dom';
import { Card, CardBody ,CardTitle } from 'reactstrap';
import '../styles/Component.css';
import { DropTarget } from 'react-dnd';
import ComponentDnDSource from '../../../client/src/components/ComponentDnDSource';
import { Puzzle, Prop, Lock, Music, Event } from '../../../client/src/models/index.js';
import Area from '../../../client/src/models/Area';
import PropTypes from 'prop-types';

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
        if (monitor.didDrop() || !component || typeof props.component===undefined){
            return;
        }
        const item = monitor.getItem();
        let clientOffset = monitor.getClientOffset();
        let targetRect = ReactDOM.findDOMNode(component).getBoundingClientRect();
        let offset = component.state.width * 0.025;
        item.position = {top:(((clientOffset.y-targetRect.y-offset)/targetRect.height)*100)+"%",left:(((clientOffset.x-targetRect.x-offset)/targetRect.width)*100)+"%"};
        component.handleComponentDrop(item);
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
        isOverCurrent: monitor.isOver(),
        canDrop: monitor.canDrop(),
        itemType: monitor.getItemType()
    }
}

/**
 * Class for Area drag and drop target for components 
 * @extends Component
 * @author Alistair Quinn
 */
class AreaDnDTarget extends Component {
    /** Creates AreaDnDTarget */
    constructor(){
        super();
        this.state={width:window.innerWidth};
    }

    /**
     * React Lifecycle Method
     * Called when compoent mounts
     */
    componentDidMount() {
        this.updateScreenDimensions();
        window.addEventListener("resize", this.updateScreenDimensions);
    }

    /**
     * React Lifecycle Method
     * Called when component will unmount
     */
    componentWillUnmount(){
        window.removeEventListener("resize", this.updateScreenDimensions);
    }

    updateScreenDimensions = () => {
        this.setState({ width: window.innerWidth });
    }

    /** 
     * Adds new components and updates existing
     * @param {Component} item
     */
    handleComponentDrop(item){
        let component = null;
        if (item.id !== undefined && item._id === undefined){
            switch(item.id){
                case 'Puzzle':
                    component = new Puzzle();
                    component.position = item.position;
                    break;
                case 'Prop':
                    component = new Prop();
                    component.position = item.position;
                    break;
                case 'Lock':
                    component = new Lock();
                    component.position = item.position;
                    break;
                case 'Event':
                    component = new Event();
                    component.position = item.position;
                    break;
                case 'Music':
                    component = new Music();
                    component.position = item.position;
                    break;
                default:
                    return;
            }
            this.props.addComponent(component,this.props.component._id);
        } else {
            component = item;
            this.props.updateComponent(component,this.props.component._id);
        }
    }

    /** 
     * React Lifecycle Render
     * @returns {JSX}
     */
    render() {
        var classNames = "Area";
        if(this.props.isOver && this.props.canDrop){
            classNames+=" canDrop";
        } else if(this.props.isOver && !this.props.canDrop){
            classNames+=" cantDrop";
        } else if(this.props.canDrop){
            classNames+=" couldDrop"
        }
        let title = this.props.component.type + " (" + this.props.component._id + ") " + this.props.component.name;
        return this.props.connectDropTarget(
            <div className={this.props.component.type} key={this.props.component._id}>                
                <Card className={classNames} onClick={this.props.handleComponentClick(this.props.component)}>
                    <CardBody>
                        <CardTitle>{title}</CardTitle>  
                            {this.props.outputComponents.map((component,i)=>{
                                component = this.props.findComponent(component._id);
                                return(<ComponentDnDSource key={component._id} update={this.update} isTarget handleComponentClick={this.props.handleComponentClick}  component={component} findComponent={this.props.findComponent} id={component.type} showModal={this.props.showModal} addComponent={this.props.addComponent} removeComponent={this.props.removeComponent} addRelationship={this.props.addRelationship}/>)
                            })}
                    </CardBody>
                </Card>   
            </div>
        )
    }
};

AreaDnDTarget.propTypes = {
    component: PropTypes.instanceOf(Area),
    outputComponents: PropTypes.array,
    isOver: PropTypes.bool,
    canDrop: PropTypes.bool,
    addComponent: PropTypes.func,
    removeComponent: PropTypes.func,
    updateComponent: PropTypes.func,
    addRelationship: PropTypes.func,
    findComponent: PropTypes.func,
    showModal: PropTypes.func,
    handleComponentClick: PropTypes.func,
}

export default DropTarget(Types.COMPONENT, componentTarget, collect)(AreaDnDTarget);