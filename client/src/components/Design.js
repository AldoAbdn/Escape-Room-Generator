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
    render(){
        return (
            <Container>
                <Row>
                    <Col md="2">
                        <Pallet/>
                    </Col>
                    <Col md="8">
                        <ComponentArranger showModal={this.props.showModal} handleComponentClick={this.handleComponentClick} updateComponent={this.props.updateComponent} addComponent={this.props.addComponent} removeComponent={this.props.removeComponent} addRelationship={this.props.addRelationship} components={this.props.components.components}/>            
                    </Col>
                    <Col md="2">
                        <ComponentDetails selected={this.state.selected} updateComponent={this.props.updateComponent}/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Design;