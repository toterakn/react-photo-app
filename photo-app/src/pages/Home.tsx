import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'
import Row from 'react-bootstrap/Row'

const Home = () => {
    return(
        <Container fluid>
            <h1 className='my-3'>Photo App</h1>
            <p>This app allows users to capture and view photos.</p>

            <h3>Specifications:</h3>
            <br/>
            <Row className='justify-content-center pt-3 pb-3'>
                <div className='alert-info'>
                    <h4>Functional</h4>
                    <ListGroup variant='flush'>
                      <ListGroup.Item>Ability to take photos</ListGroup.Item>
                      <ListGroup.Item>Ability to “save” photos by type (selfie, regular)</ListGroup.Item>
                      <ListGroup.Item>Ability to search and view photos by type</ListGroup.Item>
                    </ListGroup>
                </div>
            </Row>
            <Row className='justify-content-center pt-3 pb-3'>
                <div className='alert-success'>
                    <h4>Technical</h4>
                    <ListGroup variant='flush'>
                      <ListGroup.Item>Uses React and Typescript</ListGroup.Item>
                      <ListGroup.Item>Uses Bootstrap</ListGroup.Item>
                    </ListGroup>
                </div>
            </Row>
        </Container>
    )
}

export default Home