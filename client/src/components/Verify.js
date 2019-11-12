import React, {Component}  from 'react';
import { Container, Row, Col, Alert } from 'reactstrap';

class Verify extends Component {
    constructor(props){
        super(props);
        this.state = {color:"success",message:""};
    }
    verify = async () => {
        if(this.props.verify){
            var result = await this.props.verify(this.props.token);
            this.setState({color:result.type,message:result.message});
        }
    }
    componentDidMount(){
        this.verify();
    }
    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <Alert isOpen={this.state.message!==""} color={this.state.color}>{this.state.message}</Alert>
                    </Col>
                </Row>
            </Container>
        )
    }
};

export default Verify;