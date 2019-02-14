import React, {Component}  from 'react';
import { Card, CardBody ,CardTitle } from 'reactstrap';
import '../styles/Component.css';
import { DropTarget } from 'react-dnd';
import ComponentDnDSource from './ComponentDnDSource';
import { Puzzle, Lock, Music, Event } from '../models/index.js';
import { ArcherContainer } from 'react-archer';

const Types = {
    COMPONENT: 'COMPONENT'
}

const componentTarget = {
    drop(props,monitor,component){
        if (monitor.didDrop() || !component || typeof props.component===undefined){
            return;
        }
        const item = monitor.getItem();
        if (item.position === undefined){
            item.position = {top:0,left:0};
        } else {
            const delta = monitor.getDifferenceFromInitialOffset()
            item.position.left = Math.round(item.position.left + delta.x);
            item.position.top = Math.round(item.position.top + delta.y);
        }
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
    handleComponentDrop(item,isInput=false){
        var component = null;
        if (item.id!==undefined && item._id === undefined){
            switch(item.id){
                case 'Puzzle':
                    component = new Puzzle();
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
        } else {
            component = item;
        }
        this.props.handleComponentDrop(component,this.props.component._id,isInput);
    }
    render() {
        var classNames;
        if(this.props.isOver && this.props.canDrop){
            classNames="canDrop";
        } else if(this.props.isOver){
            classNames="cantDrop";
        }
        return this.props.connectDropTarget(
            <div className={classNames} key={this.props.component._id}>
                       
                   <Card className={this.props.component.type} onClick={this.props.handleComponentClick(this.props.component)}>
                        <CardBody>
                            <CardTitle>{this.props.component.type}</CardTitle>
                            <ArcherContainer>   
                                {this.props.component.outputComponents.map((componentId,i)=>{
                                    let component = this.props.findComponent(componentId);
                                    return(<ComponentDnDSource key={componentId} isTarget handleComponentDrop={this.props.handleComponentDrop} handleComponentClick={this.props.handleComponentClick} handleDidNotDrop={this.props.handleDidNotDrop} component={component} id={component.type}/>)
                                })}
                                </ArcherContainer>
                        </CardBody>
                    </Card>
                
            </div>
        )
    }
};

export default DropTarget(Types.COMPONENT, componentTarget, collect)(AreaDnDTarget);