import React from 'react';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';

const Home = () => {
    return(
        <Container fluid>
            <h1>Photo App</h1>
            <p>This app allows users to capture and view photos of individual leaves and/or plants.</p>

            <h3>Requirements:</h3>
            <br/>
            <Row className="justify-content-center">
                <div>
                    <h4>Functional</h4>
                    <br/>
                    <ListGroup variant="flush">
                      <ListGroup.Item>Ability to take photos</ListGroup.Item>
                      <ListGroup.Item>Ability to “save” photo as either Arugula, Kale, or Basil</ListGroup.Item>
                      <ListGroup.Item>Ability to search and view photos by species</ListGroup.Item>
                      <ListGroup.Item>If time, ability to annotate specific areas of the photo and view annotations</ListGroup.Item>
                    </ListGroup>
                </div>
            </Row>
            <Row className="justify-content-center">
                <div>
                    <h4>Technical</h4>
                    <br/>
                    <ListGroup variant="flush">
                      <ListGroup.Item>Use a modern Javascript framework</ListGroup.Item>
                      <ListGroup.Item>Feel free to pull in any relevant libraries, CSS etc...</ListGroup.Item>
                    </ListGroup>
                </div>
            </Row>
        </Container>
    );
}

export default Home;