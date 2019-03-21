import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Pallet, ComponentArranger, ComponentDetails } from './index';

class Design extends Component {
    constructor(props){
        super(props);
        this.state = {selected: {}};
    }
    handleComponentClick = (component) => (e) => {
        e.stopPropagation();
        this.setState({selected:component});
    }
    updateComponent = (component) => {
        this.props.updateComponent(component);
        this.setState({selected:{...this.state.selected,...component}});
    }
    findComponent = (id) => {
        return this.props.components.components.find(component=>component._id===id);
    }
    render(){
        return (
            <Container fluid>
                <Row>
                    <Col md="2">
                        <Pallet/>
                    </Col>
                    <Col md="8">
                        <ComponentArranger renderTrigger={JSON.stringify(this.props.components.components)} findComponent={this.findComponent} showModal={this.props.showModal} handleComponentClick={this.handleComponentClick} updateComponent={this.props.updateComponent} addComponent={this.props.addComponent} removeComponent={this.props.removeComponent} addRelationship={this.props.addRelationship} components={this.props.components.components}/>            
                    </Col>
                    <Col md="2">
                        <ComponentDetails accessibility={this.props.accessibility} selected={this.state.selected} updateComponent={this.updateComponent}/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Design;