import React, {Component} from 'react';
import { Container, Row, Col, Card, CustomInput } from 'reactstrap';
import '../styles/accessibility.css';

class Accessibility extends Component {
    handleVisualChange = (event) => {
        var state = {...this.props.accessibility};
        state.visual[event.target.id] = event.target.value===true?false:true;
        this.props.updateAccessibility(state);
    }
    //Changes state on input change
    handlePhysicalChange = (event) => {
        var state = {...this.props.accessibility};
        state.physical[event.target.id] = event.target.value===true?false:true;
        this.props.updateAccessibility(state);
    }
    render(){
        return (
            <Container fluid className="accessibility">
                <Row>
                    <Col>
                        <Row>
                            <Col>
                                <h1 className="text-center text-success">Visual Accessibility</h1>
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
                                   <CustomInput type="checkbox" name="protanomaly" id="protanomaly" label="Protanomaly" value={this.props.accessibility.visual.protanomaly} onChange={this.handleVisualChange}/>
                                   <CustomInput type="checkbox" name="protanopia" id="protanopia" label="Protanopia" value={this.props.accessibility.visual.protanopia} onChange={this.handleVisualChange}/>
                                   <CustomInput type="checkbox" name="deuteranomaly" id="deuteranomaly" label="Deuteranomaly" value={this.props.accessibility.visual.deuteranomaly} onChange={this.handleVisualChange}/>
                                   <CustomInput type="checkbox" name="deuteranopia" id="deuteranopia" label="Deuteranopia" value={this.props.accessibility.visual.deuteranopia} onChange={this.handleVisualChange}/>
                                   <CustomInput type="checkbox" name="tritanomaly" id="tritanomaly" label="Tritanomaly" value={this.props.accessibility.visual.tritanomaly} onChange={this.handleVisualChange}/>
                                   <CustomInput type="checkbox" name="tritanopia" id="tritanopia" label="Tritanopia" value={this.props.accessibility.visual.tritanopia} onChange={this.handleVisualChange}/>
                                   <CustomInput type="checkbox" name="coneMonochromacy" id="coneMonochromacy" label="Cone Monochromacy" value={this.props.accessibility.visual.coneMonochromacy} onChange={this.handleVisualChange}/>
                                   <CustomInput type="checkbox" name="rodMonochromacy" id="rodMonochromacy" label="Rod Monochromacy" value={this.props.accessibility.visual.rodMonochromacy} onChange={this.handleVisualChange}/>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                   <CustomInput type="checkbox" name="largeFonts" id="largeFonts" label="Large Fonts" value={this.props.accessibility.visual.largeFonts} onChange={this.handleVisualChange}/>
                                   <CustomInput type="checkbox" name="highContrast" id="highContrast" label="High Contrast" value={this.props.accessibility.visual.highContrast} onChange={this.handleVisualChange}/>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <Col>
                                <h1 className="text-center text-primary">Physical Accessibility</h1>
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
                                   <CustomInput type="checkbox" name="wheelchairAccessible" id="wheelchairAccessible" label="Wheelchair Accessible" value={this.props.accessibility.physical.wheelchairAccessible} onChange={this.handlePhysicalChange}/>
                                   <CustomInput type="checkbox" name="motorAccessible" id="motorAccessible" label="Accessible for players with motor function issues" value={this.props.accessibility.physical.motorAccessible} onChange={this.handlePhysicalChange}/>
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