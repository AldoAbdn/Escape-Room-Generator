import React, {Component}  from 'react';
import ReactDOM from 'react-dom';
import { Card, CardBody ,CardTitle } from 'reactstrap';
import '../styles/Component.css';
import { DropTarget } from 'react-dnd';
import ComponentDnDSource from './ComponentDnDSource';
import { Puzzle, Prop, Lock, Music, Event } from '../models/index.js';

const Types = {
    COMPONENT: 'COMPONENT'
}

const componentTarget = {
    drop(props,monitor,component){
        if (monitor.didDrop() || !component || typeof props.component===undefined){
            return;
        }
        const item = monitor.getItem();
        let clientOffset = monitor.getClientOffset();
        let targetRect = ReactDOM.findDOMNode(component).getBoundingClientRect();
        item.position = {top:(((clientOffset.y-targetRect.y)/targetRect.height)*100)+"%",left:(((clientOffset.x-targetRect.x)/targetRect.width)*100)+"%"};
        component.handleComponentDrop(item);
        return {moved:true};
    }
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver(),
        canDrop: monitor.canDrop(),
        itemType: monitor.getItemType()
    }
}

class AreaDnDTarget extends Component {
    constructor(){
        super()
        this.state={render:true,screenWidth:0,screenHeight:0};
    }
    updateScreenSize=()=>{
        this.setState({screenWidth:window.innerHeight,screenHeight:window.innerHeight})
    }
    handleComponentDrop(item,isInput=false){
        var component = null;
        if (item.id!==undefined && item._id === undefined){
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
    componentDidMount(){
        this.updateScreenSize();
        window.addEventListener('resize', this.updateScreenSize);
    }
    componentWillUnmount(){
        window.removeEventListener('resize',this.updateScreenSize);
    }
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
                            {this.props.outputComponents.map((origComponent,i)=>{
                                let component;
                                component = this.props.findComponent(origComponent._id);
                                return(<ComponentDnDSource addRef={this.props.addRef} key={i} renderTrigger={JSON.stringify(this.props.outputComponents)} isTarget handleComponentClick={this.props.handleComponentClick}  component={component} findComponent={this.props.findComponent} id={component.type} showModal={this.props.showModal} addComponent={this.props.addComponent} removeComponent={this.props.removeComponent} addRelationship={this.props.addRelationship}/>)
                            })}
                    </CardBody>
                </Card>   
            </div>
        )
    }
};

export default DropTarget(Types.COMPONENT, componentTarget, collect)(AreaDnDTarget);