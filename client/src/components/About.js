import React, {Component}  from 'react';
import { Container, Row, Col } from 'reactstrap';

/** 
 * Class for About Page 
 * @extends Component
 * @author Alistair Quinn
 */
class About extends Component {
    /** 
     * React Lifecycle Render
     * Renders Layout
     * @returns {JSX}
     */
    render() {
        return (
            <div className="full-container verticaly-center-content">
                <Container>
                    <Row>
                        <Col>
                            <p>
                                The Escape Room Generator is a web app for designing an escape room, that allows you to export your design in either JSON or PDF format. This project originally started as my honours project and I have continued its development.
                                The main goals of the project are: 
                            </p>       
                            <ul>
                                <li>To allow Escape Room designs to be 'portable'</li>
                                <li>To help designers create puzzles by providing tools to generate puzzles, answers and materials</li>
                                <li>To highlight the accessibility needs of potential players, an aspect of Escape Room design that is often ignored</li>
                            </ul>
                            <p>
                                For more information click the GitHub link at the top of the page. If you need to contact me directly you can do so by <a href="mailto:escaperoomgenerator@gmail.com">email</a> or join my Discord server by clicking <a href="https://discord.gg/FqDHR9g">here</a>
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>

        )
    }
};

export default About;