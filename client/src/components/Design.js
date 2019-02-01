import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Pallet, ComponentArranger, ComponentDetails } from './index';

class Design extends Component {
    constructor(props){
        super(props);
        this.state = {selected: {}};
    }
    //Changes state on input change
    handleComponentDetailsChange = (state) => { 
        
    }
    render(){
        return (
            <Container>
                <Row>
                    <Col>
                        <Pallet/>
                    </Col>
                    <Col xs="8">
                        <ComponentArranger/>
                    </Col>
                    <Col>
                        <ComponentDetails selected={this.state.selected} onChange={this.handleComponentDetailsChange}/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Design;