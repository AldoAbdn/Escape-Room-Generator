import React, {Component}  from 'react';
import { Card, CardBody } from 'reactstrap';
import '../styles/Component.css';
import { DropTarget } from 'react-dnd';
import { Puzzle, Event, Music, Lock } from '../models/index';

const Types = {
    COMPONENT: 'COMPONENT'
}

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

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({shallow:true}),
        canDrop: monitor.canDrop(),
        itemType: monitor.getItemType()
    }
}

class ComponentDnDTarget extends Component {
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
                default:
                    return;
            }
        } else {
            component = item;
        }
        console.log(component);
        this.props.handleComponentDrop(component,this.props.component._id,isInput);
    }
    handleDidNotDrop = (component) => {
        this.props.handleDidNotDrop(component);
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
                <Card onClick={this.props.handleComponentClick(this.props.component)}>
                    <CardBody>

                    </CardBody>
                </Card>
            </div>
        )
    }
};

export default DropTarget(Types.COMPONENT, componentTarget, collect)(ComponentDnDTarget);