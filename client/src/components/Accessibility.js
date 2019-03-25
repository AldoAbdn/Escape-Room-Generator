import React, {Component} from 'react';
import { Container, Row, Col, Card, CustomInput, UncontrolledTooltip } from 'reactstrap';
import '../styles/Accessibility.css';

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
                                    <h6 className="text-success">Red-Green Colour Blindness</h6>
                                    <Row>
                                        <Col xs="8"><CustomInput type="checkbox" name="protanomaly" id="protanomaly" label="Protanomaly" value={this.props.accessibility.visual.protanomaly} onChange={this.handleVisualChange}/></Col>
                                        <Col xs="4" id="protanomalyTooltip"><i className="fa fa-question-circle full-width-right" aria-hidden="true"></i></Col>
                                        <UncontrolledTooltip target="protanomalyTooltip">Protanomaly: In males with protanomaly, the red cone photopigment is abnormal. Red, orange, and yellow appear greener and colors are not as bright. This condition is mild and doesn’t usually interfere with daily living. Protanomaly is an X-linked disorder estimated to affect 1 percent of males.</UncontrolledTooltip>
                                    </Row>
                                    <Row>
                                        <Col xs="8"><CustomInput type="checkbox" name="protanopia" id="protanopia" label="Protanopia" value={this.props.accessibility.visual.protanopia} onChange={this.handleVisualChange}/></Col>
                                        <Col xs="4" id="protanopiaTooltip"><i className="fa fa-question-circle full-width-right" aria-hidden="true"></i></Col>
                                        <UncontrolledTooltip target="protanopiaTooltip">Protanopia: In males with protanopia, there are no working red cone cells. Red appears as black. Certain shades of orange, yellow, and green all appear as yellow. Protanopia is an X-linked disorder that is estimated to affect 1 percent of males.</UncontrolledTooltip>
                                    </Row>
                                    <Row>
                                        <Col xs="8"><CustomInput type="checkbox" name="deuteranomaly" id="deuteranomaly" label="Deuteranomaly" value={this.props.accessibility.visual.deuteranomaly} onChange={this.handleVisualChange}/></Col>
                                        <Col xs="4" id="deuteranomalyTooltip"><i className="fa fa-question-circle full-width-right" aria-hidden="true"></i></Col>
                                        <UncontrolledTooltip target="deuteranomalyTooltip">Deuteranomaly: In males with deuteranomaly, the green cone photopigment is abnormal. Yellow and green appear redder and it is difficult to tell violet from blue. This condition is mild and doesn’t interfere with daily living. Deuteranomaly is the most common form of color blindness and is an X-linked disorder affecting 5 percent of males.</UncontrolledTooltip>
                                    </Row>
                                    <Row>
                                        <Col xs="8"><CustomInput type="checkbox" name="deuteranopia" id="deuteranopia" label="Deuteranopia" value={this.props.accessibility.visual.deuteranopia} onChange={this.handleVisualChange}/></Col>
                                        <Col xs="4" id="deuteranopiaTooltip"><i className="fa fa-question-circle full-width-right" aria-hidden="true"></i></Col>
                                        <UncontrolledTooltip target="deuteranopiaTooltip">Deuteranopia: In males with deuteranopia, there are no working green cone cells. They tend to see reds as brownish-yellow and greens as beige. Deuteranopia is an X-linked disorder that affects about 1 percent of males.</UncontrolledTooltip>
                                    </Row>

                                    <h6 className="text-success">Blue-Yellow Colour Blindness</h6>
                                    <Row>
                                        <Col xs="8"><CustomInput type="checkbox" name="tritanomaly" id="tritanomaly" label="Tritanomaly" value={this.props.accessibility.visual.tritanomaly} onChange={this.handleVisualChange}/></Col>
                                        <Col xs="4" id="tritanomalyTooltip"><i className="fa fa-question-circle full-width-right" aria-hidden="true"></i></Col>
                                        <UncontrolledTooltip target="tritanomalyTooltip">Tritanomaly: People with tritanomaly have functionally limited blue cone cells. Blue appears greener and it can be difficult to tell yellow and red from pink. Tritanomaly is extremely rare. It is an autosomal dominant disorder affecting males and females equally.</UncontrolledTooltip>
                                    </Row>
                                    <Row>
                                        <Col xs="8"><CustomInput type="checkbox" name="tritanopia" id="tritanopia" label="Tritanopia" value={this.props.accessibility.visual.tritanopia} onChange={this.handleVisualChange}/></Col>
                                        <Col xs="4" id="tritanopiaTooltip"><i className="fa fa-question-circle full-width-right" aria-hidden="true"></i></Col>
                                        <UncontrolledTooltip target="tritanopiaTooltip">Tritanopia: People with tritanopia, also known as blue-yellow color blindness, lack blue cone cells. Blue appears green and yellow appears violet or light grey. Tritanopia is an extremely rare autosomal recessive disorder affecting males and females equally.</UncontrolledTooltip>
                                    </Row>
            
                                    <h6 className="text-success">Complete Colour Blindness</h6>
                                    <Row>
                                        <Col xs="8"><CustomInput type="checkbox" name="coneMonochromacy" id="coneMonochromacy" label="Cone Monochromacy" value={this.props.accessibility.visual.coneMonochromacy} onChange={this.handleVisualChange}/></Col>
                                        <Col xs="4" id="coneMonochromacyTooltip"><i className="fa fa-question-circle full-width-right" aria-hidden="true"></i></Col>
                                        <UncontrolledTooltip target="coneMonochromacyTooltip">Cone Monochromacy: This rare form of color blindness results from a failure of two of the three cone cell photopigments to work. There is red cone monochromacy, green cone monochromacy, and blue cone monochromacy. People with cone monochromacy have trouble distinguishing colors because the brain needs to compare the signals from different types of cones in order to see color. When only one type of cone works, this comparison isn’t possible. People with blue cone monochromacy, may also have reduced visual acuity, near-sightedness, and uncontrollable eye movements, a condition known as nystagmus. Cone monochromacy is an autosomal recessive disorder.</UncontrolledTooltip>
                                    </Row>
                                    <Row>
                                        <Col xs="8"><CustomInput type="checkbox" name="rodMonochromacy" id="rodMonochromacy" label="Rod Monochromacy" value={this.props.accessibility.visual.rodMonochromacy} onChange={this.handleVisualChange}/></Col>
                                        <Col xs="4" id="rodMonochromacyTooltip"><i className="fa fa-question-circle full-width-right" aria-hidden="true"></i></Col>
                                        <UncontrolledTooltip target="rodMonochromacyTooltip">Rod Monochromacy: This type of monochromacy is rare and is the most severe form of color blindness. It is present at birth. None of the cone cells have functional photopigments. Lacking all cone vision, people with rod monochromacy see the world in black, white, and gray. And since rods respond to dim light, people with rod monochromacy tend to be photophobic – very uncomfortable in bright environments. They also experience nystagmus. Rod monochromacy is an autosomal recessive disorder.</UncontrolledTooltip>
                                    </Row>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <Row>
                                        <Col xs="8"><CustomInput type="checkbox" name="largeFonts" id="largeFonts" label="Large Fonts" value={this.props.accessibility.visual.largeFonts} onChange={this.handleVisualChange}/></Col>
                                        <Col xs="4" id="largeFontsTooltip"><i className="fa fa-question-circle full-width-right" aria-hidden="true"></i></Col>
                                        <UncontrolledTooltip target="largeFontsTooltip">If your design requires larger fonts as you are expecting players with issues with short sightedness, this is a suitable option to select</UncontrolledTooltip>
                                    </Row>
                                    <Row>
                                        <Col xs="8"><CustomInput type="checkbox" name="highContrast" id="highContrast" label="High Contrast" value={this.props.accessibility.visual.highContrast} onChange={this.handleVisualChange}/></Col>
                                        <Col xs="4" id="highContrastTooltip"><i className="fa fa-question-circle full-width-right" aria-hidden="true"></i></Col>
                                        <UncontrolledTooltip target="highContrastTooltip">If your design requires a contrasting colour scheme to be used to make text more readable, select this option</UncontrolledTooltip>
                                    </Row>
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
                                    <Row>
                                        <Col xs="8"> <CustomInput type="checkbox" name="wheelchairAccessible" id="wheelchairAccessible" label="Wheelchair Accessible" value={this.props.accessibility.physical.wheelchairAccessible} onChange={this.handlePhysicalChange}/></Col>
                                        <Col xs="4" id="wheelchairAccessibleTooltip"><i className="fa fa-question-circle full-width-right" aria-hidden="true"></i></Col>
                                        <UncontrolledTooltip target="wheelchairAccessibleTooltip">If your design is required to be wheelchair accessible select this option</UncontrolledTooltip>
                                    </Row>
                                    <Row>
                                        <Col xs="8"><CustomInput type="checkbox" name="motorAccessible" id="motorAccessible" label="Accessible for players with motor function issues" value={this.props.accessibility.physical.motorAccessible} onChange={this.handlePhysicalChange}/></Col>
                                        <Col xs="4" id="motorAccessibleTooltip"><i className="fa fa-question-circle full-width-right" aria-hidden="true"></i></Col>
                                        <UncontrolledTooltip target="motorAccessibleTooltip">If your design is required to be wheelchair accessible select this option</UncontrolledTooltip>
                                    </Row>
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