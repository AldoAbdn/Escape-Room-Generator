import React, {Component} from 'react';
import { Container, Row, Col, Card, CustomInput } from 'reactstrap';

class Accessibility extends Component {
    constructor(){
        super();
        this.state = {
            protanomaly:false,
            protanopia:false,
            deuteranomaly:false,
            deuteranopia:false,
            tritanomaly:false,
            tritanopia:false,
            coneMonochramacy:false,
            rodMonochromacy:false,
            wheelchairAccessible:false,
            motorAccessible:false
        };
    }
    //Changes state on input change
    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
        var state = {...this.state};
        state[event.target.id] = event.target.value;    
        this.props.handleChange(state);
    }
    render(){
        return (
            <Container>
                <Row>
                    <Col>
                        <Row>
                            <Col>
                                <h1 className="text-center">Visual Accessibility</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h2>Colour Blindness</h2>
                                <p>
                                    Please select the types of colour blindness your design must take into account
                                </p>
                            </Col>
                            <Col>
                                <h2>Other</h2>
                                <p>
                                    These are options to indicate restrictions on the design related to visual impairments such as blindness 
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card>
                                   <CustomInput type="checkbox" name="protanomaly" id="protanomaly" label="Protanomaly" value={this.state.protanomaly} onChange={this.handleChange}/>
                                   <CustomInput type="checkbox" name="protanopia" id="protanopia" label="Protanopia" value={this.state.protanopia} onChange={this.handleChange}/>
                                   <CustomInput type="checkbox" name="deuteranomaly" id="deuteranomaly" label="Deuteranomaly" value={this.state.deuteranomaly} onChange={this.handleChange}/>
                                   <CustomInput type="checkbox" name="deuteranopia" id="deuteranopia" label="Deuteranopia" value={this.state.deuteranopia} onChange={this.handleChange}/>
                                   <CustomInput type="checkbox" name="tritanomaly" id="tritanomaly" label="Tritanomaly" value={this.state.tritanomaly} onChange={this.handleChange}/>
                                   <CustomInput type="checkbox" name="tritanopia" id="tritanopia" label="Tritanopia" value={this.state.tritanopia} onChange={this.handleChange}/>
                                   <CustomInput type="checkbox" name="coneMonochromacy" id="coneMonochromacy" label="Cone Monochromacy" value={this.state.coneMonochromacy} onChange={this.handleChange}/>
                                   <CustomInput type="checkbox" name="rodMonochromacy" id="rodMonochromacy" label="Rod Monochromacy" value={this.state.rodMonochromacy} onChange={this.handleChange}/>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                   <CustomInput type="checkbox" name="largeFonts" id="largeFonts" label="Large Fonts" value={this.state.largeFonts} onChange={this.handleChange}/>
                                   <CustomInput type="checkbox" name="highContrast" id="highContrast" label="High Contrast" value={this.state.highContrast} onChange={this.handleChange}/>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <Col>
                                <h1 className="text-center">Physical Accessibility</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p>
                                    These options are to indicate restrictions on the design related to physical impairments for example wheelchair accessibility and motor functions
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card>
                                   <CustomInput type="checkbox" name="Wheelchair Accessible" id="heelchairAccessible" label="wheelchairAccessible" value={this.state.wheelchairAccessible} onChange={this.handleChange}/>
                                   <CustomInput type="checkbox" name="motorAccessible" id="motorAccessible" label="Accessible for players with motor function issues" value={this.state.motorAccessible} onChange={this.handleChange}/>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>
                            These options are designed to indicate the attempted accessibility of your design. These options will flag puzzles in your design that do not meet these restrictions
                        </p>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Accessibility;