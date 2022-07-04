import React, {Component}  from 'react';
import { Row, Col } from 'reactstrap';
import '../styles/Component.css';
import '../styles/ComponentArranger.css';
import Area from './AreaDnDSource';
import AreaModel from '../../../client/src/models/Area';
import { DropTarget } from 'react-dnd';
import Xarrow from "react-xarrows";
import PropTypes from 'prop-types';

/**
 * Drag sources and drop targets only interact
 * if they have the same string type.
 * You want to keep types in a separate file with
 * the rest of your app's constants.
 */
const Types = {
    AREA: 'AREA'
}

/**
 * Specifies the drop target contract.
 * All methods are optional.
 */
const areaArrangerTarget = {
    drop(props, monitor, component){
        const item = monitor.getItem();
        if(item.component===undefined || item.component===null){
            component.props.addComponent(new AreaModel());
        }
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
      // Call this function inside render()
      // to let React DnD handle the drag events:
      connectDropTarget: connect.dropTarget(),
      // You can ask the monitor about the current drag state:
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
      itemType: monitor.getItemType()
    };
}

/**
 * Class for ComponentAranger, Drop target for Area's
 * @extends Component
 * @author Alistair Quinn
 */
class ComponentArranger extends Component {
    /** Creates ComponentArranger */
    constructor(){
        super()
        this.state = {lines:[]}
    }

    /**
     * Maps Area to a Row
     * @function
     * @param {Area} area
     * @param {int} i Index
     * @returns {JSX} Row
     */
    mapAreas = (area,i)=>{
        if(area.type==='Area'){
            let outputComponents = this.props.components.filter((component)=>{
                return area.outputComponents.includes(component._id);
            });
            return (
                <Row key={area._id}>
                    <Col xs="12"> 
                        <Area isTarget findComponent={this.findComponent} handleComponentClick={this.props.handleComponentClick} component={area} outputComponents={outputComponents} showModal={this.props.showModal} addComponent={this.props.addComponent} removeComponent={this.props.removeComponent} updateComponent={this.props.updateComponent} addRelationship={this.props.addRelationship}/>
                    </Col>
                </Row>
            )  
        }
    }

    /**
     * React Lifecycle called on Update
     * @param {object} props 
     * @param {object} state 
     */
    componentDidUpdate(props,state) {
        if(JSON.stringify(this.props.components)!==JSON.stringify(props.components)){
            this.forceUpdate();
        }
    }

    /** Calls force update */
    update = () => this.forceUpdate()

    /** React Lifecycle called when component Mounts */
    componentDidMount() {
        setTimeout(()=>{
            this.forceUpdate();
        },100)
        window.addEventListener('scroll', this.update, true);
        window.addEventListener('resize', this.update);
    }
    
    /** React Lifecycle called when component unmounts */
    componentWillUnmount() {
        window.removeEventListener('scroll', this.update);
        window.removeEventListener('resize', this.update);
    }

    /**
     * Finds a component by ID
     * @param {string} id
     * @returns {Component}
     */
    findComponent = (id) => {
        return this.props.components.find(component=>component._id===id);
    }

    /** 
     * React Lifecycle Render
     * @returns {JSX}
     */
    render() {
        var classNames = "row component-arranger";
        if(this.props.isOver && this.props.canDrop){
            classNames+=" canDrop"
        } else if (this.props.isOver){
            classNames+=" cantDrop"
        }
        let lines = [];
        for(let component of this.props.components){
            if(component!==undefined && component.inputComponents!==undefined && component.type!=="Area"){
                let inputComponents = component.inputComponents;
                let outputComponents = component.outputComponents;
                for(let inputComponent of inputComponents){
                    inputComponent = this.findComponent(inputComponent);
                    lines.push(<Xarrow color='blue' start={inputComponent._id} end={component._id}/>);
                };
                for(let outputComponent of outputComponents){
                    outputComponent = this.findComponent(outputComponent);
                    lines.push(<Xarrow color='green' start={component._id} end={outputComponent._id}/>);
                };
            }
        };
        return this.props.connectDropTarget(
            <div className={classNames}>
                <Col xs="12">
                    <Row>
                        <Col className="col text-center">
                            <h3>Components</h3>
                        </Col>
                    </Row>
                    <Row id="MappedComponents">
                        <Col>
                            {this.props.components.map(this.mapAreas)}
                        </Col>
                    </Row>
                </Col>
                {lines}
            </div>
        )
    }
};

ComponentArranger.propTypes = {
    components: PropTypes.array,
    isOver: PropTypes.bool,
    canDrop: PropTypes.bool,
    showModal: PropTypes.func,
    handleComponentClick: PropTypes.func,
    updateComponent: PropTypes.func,
    addComponent: PropTypes.func,
    removeComponent: PropTypes.func,
    addRelationship: PropTypes.func
}

export default DropTarget(Types.AREA, areaArrangerTarget,collect)(ComponentArranger);