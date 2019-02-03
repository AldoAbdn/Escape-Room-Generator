import React, {Component}  from 'react';
import { Card, CardBody ,CardTitle } from 'reactstrap';
import '../styles/Area.css';
import { DropTarget } from 'react-dnd';
import Puzzle from '../models/Puzzle';
import ComponentDnD from './ComponentDnD';

const Types = {
    COMPONENT: 'COMPONENT'
}

const componentTarget = {
    drop(props,monitor,component){
       const item = monitor.getItem();
        component.handleComponentDrop(item);
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

class Area extends Component {
    handleComponentDrop(item, isInput=true){
        var component = null;
        if (item.id!=undefined){
            alert(item.id);
            switch(item.id){
                case 'Puzzle':
                    component = new Puzzle();
            }
        } else {
            component = item;
        }
        this.props.handleComponentDrop(component,this.props.area._id,isInput);
    }
    handleDidNotDrop = (component) => {
        this.props.handleDidNotDrop(component);
    }
    render() {
        return this.props.connectDropTarget(
            <div key={this.props.area._id}>
                <Card className="Area" onClick={this.props.handleComponentClick(this.props.area)}>
                    <CardBody>
                        <CardTitle>Area</CardTitle>
                        {this.props.area.inputComponents.map((component,i)=>{
                            return(<ComponentDnD handleDidNotDrop={this.handleDidNotDrop} key={i} component={component} id={component.type}/>)
                        })}
                    </CardBody>
                </Card>
            </div>
        )
    }
};

export default DropTarget(Types.COMPONENT, componentTarget, collect)(Area);