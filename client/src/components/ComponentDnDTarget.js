import React, {Component}  from 'react';
import { Card, CardBody } from 'reactstrap';
import '../styles/Component.css';
import { DropTarget } from 'react-dnd';
import { Puzzle, Event, Music, Lock, Prop } from '../models/index';

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
                case 'Prop':
                    component = new Prop();
                    break;
                default:
                    return;
            }
            this.props.addComponent(component,this.props.component._id);
        }else {
            component = item;
            if(component._id!==this.props.component._id)
                this.props.addRelationship(component._id,this.props.component._id,isInput);
        }

    }
    render() {
        var classNames = "hide-border";
        if(this.props.isOver && this.props.canDrop){
            classNames+=" canDrop";
        } else if(this.props.isOver && !this.props.canDrop){
            classNames+=" cantDrop";
        } else if(this.props.canDrop){
            classNames+=" couldDrop"
        }
        return this.props.connectDropTarget(
            <div key={this.props.component._id}>
                <Card className={classNames} onClick={this.props.handleComponentClick(this.props.component)}>
                    <CardBody>

                    </CardBody>
                </Card>
            </div>
        )
    }
};

export default DropTarget(Types.COMPONENT, componentTarget, collect)(ComponentDnDTarget);