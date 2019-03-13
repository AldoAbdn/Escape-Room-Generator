import React, {Component} from 'react';
import { Container, Row, Col, Card, CustomInput } from 'reactstrap';

class Accessibility extends Component {
    //Changes state on input change
    handleChange = (event) => {
        var state = {};
        state[event.target.id] = event.target.value;    
        this.props.updateAccessibility(state);
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
                                   <CustomInput type="checkbox" name="protanomaly" id="protanomaly" label="Protanomaly" checked={this.props.accessibility.protanomaly} onChange={this.handleChange}/>
                                   <CustomInput type="checkbox" name="protanopia" id="protanopia" label="Protanopia" checked={this.props.accessibility.protanopia} onChange={this.handleChange}/>
                                   <CustomInput type="checkbox" name="deuteranomaly" id="deuteranomaly" label="Deuteranomaly" checked={this.props.accessibility.deuteranomaly} onChange={this.handleChange}/>
                                   <CustomInput type="checkbox" name="deuteranopia" id="deuteranopia" label="Deuteranopia" checked={this.props.accessibility.deuteranopia} onChange={this.handleChange}/>
                                   <CustomInput type="checkbox" name="tritanomaly" id="tritanomaly" label="Tritanomaly" checked={this.props.accessibility.tritanomaly} onChange={this.handleChange}/>
                                   <CustomInput type="checkbox" name="tritanopia" id="tritanopia" label="Tritanopia" checked={this.props.accessibility.tritanopia} onChange={this.handleChange}/>
                                   <CustomInput type="checkbox" name="coneMonochromacy" id="coneMonochromacy" label="Cone Monochromacy" checked={this.props.accessibility.coneMonochromacy} onChange={this.handleChange}/>
                                   <CustomInput type="checkbox" name="rodMonochromacy" id="rodMonochromacy" label="Rod Monochromacy" checked={this.props.accessibility.rodMonochromacy} onChange={this.handleChange}/>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                   <CustomInput type="checkbox" name="largeFonts" id="largeFonts" label="Large Fonts" value={this.props.accessibility.largeFonts} onChange={this.handleChange}/>
                                   <CustomInput type="checkbox" name="highContrast" id="highContrast" label="High Contrast" value={this.props.accessibility.highContrast} onChange={this.handleChange}/>
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
                                   <CustomInput type="checkbox" name="Wheelchair Accessible" id="heelchairAccessible" label="wheelchairAccessible" value={this.props.accessibility.wheelchairAccessible} onChange={this.handleChange}/>
                                   <CustomInput type="checkbox" name="motorAccessible" id="motorAccessible" label="Accessible for players with motor function issues" value={this.props.accessibility.motorAccessible} onChange={this.handleChange}/>
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