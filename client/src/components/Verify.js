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
        if(token!="" || token!=null){
            return (
                <Container fluid>
                    <Row>
                        <Col>
                            <Alert isOpen={this.state.message!==""} color={this.state.color}>{this.state.message}</Alert>
                        </Col>
                    </Row>
                </Container>
            )
        } else {
            <Container fluid>
                <Row>
                    <Col>
                        <h1>Verify your account</h1>
                        <p>To access The Escape Room Generator, you must first verify your account. Please check your emails and click the link.</p>
                    </Col>
                </Row>
            </Container>
        }
    }
};

export default Verify;