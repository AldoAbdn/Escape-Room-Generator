import React, {Component}  from 'react';
import { Row, Col } from 'reactstrap';
import Area from './AreaDnDSource';
import AreaModel from '../../../client/src/models/Area';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../utilities/items';
import LineTo from 'react-lineto';
import PropTypes from 'prop-types';
import '../styles/Component.css';
import '../styles/ComponentArranger.css';

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
 * Wrapper for React DnD Hooks
 * https://stackoverflow.com/questions/53371356/how-can-i-use-react-hooks-in-react-classic-class-component
 * https://reactjs.org/docs/hooks-overview.html
 * @param {*} Component 
 * @returns 
 */
 function withUseDrop(Component) {
    return function WrappedComponent(props)
    {
    const [collectedProps, drop] = useDrop(() => ({
        accept: ItemTypes.AREA
      }))
      return <ComponentArranger {...props} collectedProps = {collectedProps} drop = {drop}/>
    }
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
                        <Area renderTrigger={JSON.stringify(area)} isTarget findComponent={this.props.findComponent} handleComponentClick={this.props.handleComponentClick} component={area} outputComponents={outputComponents} showModal={this.props.showModal} addComponent={this.props.addComponent} removeComponent={this.props.removeComponent} updateComponent={this.props.updateComponent} addRelationship={this.props.addRelationship}/>
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
                    inputComponent = this.props.findComponent(inputComponent);
                    lines.push(<LineTo key={component._id+inputComponent._id+'input'} from={component._id} to={inputComponent._id} borderColor={"#007bff"}/>);
                };
                for(let outputComponent of outputComponents){
                    outputComponent = this.props.findComponent(outputComponent);
                    lines.push(<LineTo key={component._id+outputComponent._id+'output'} from={component._id} to={outputComponent._id} borderColor={"#28a745"}/>)
                };
            }
        };
        return this.props.connectDropTarget(
            <div className={classNames}>
                {lines}
                    <Col xs="12">
                        <Row>
                            <Col className="col text-center">
                                <h3>Components</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {this.props.components.map(this.mapAreas)}
                            </Col>
                        </Row>
                    </Col>
            </div>
        )
    }
};

ComponentArranger.propTypes = {
    renderTrigger: PropTypes.string,
    components: PropTypes.array,
    isOver: PropTypes.bool,
    canDrop: PropTypes.bool,
    findComponent: PropTypes.func,
    showModal: PropTypes.func,
    handleComponentClick: PropTypes.func,
    updateComponent: PropTypes.func,
    addComponent: PropTypes.func,
    removeComponent: PropTypes.func,
    addRelationship: PropTypes.func
}

export default withUseDrop(ComponentArranger);