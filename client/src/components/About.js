import React, {Component}  from 'react';
import { Container, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';

class About extends Component {
    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <p>
                            This is my honours project for BsC(Hons) Computing: Application Software Development at Robert Gordon University
                            This is a web app for designing an escape room using drag and drop components
                        </p>       
                    </Col>
                    <Col>
                        <ul>
                            <li><a href="https://github.com/AldoAbdn/Escape-Room-Generator/">Github Repo</a></li>
                            <li><a href="https://ninjamock.com/s/KCMW2Tx">Wireframe</a></li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        )
    }
};

About.propTypes = {
    
}

export default About;