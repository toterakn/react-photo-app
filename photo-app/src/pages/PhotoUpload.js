import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import TakePhoto from '../components/TakePhoto';

const PhotoUpload = () => {
    const validFilterTypes = ['kale', 'spinach', 'arugula'];
    const initAlert = {type:null, text: null};

    const [filterType, setFilterType] = useState(validFilterTypes[0]);
    const [annotationsText, setAnnotationsText] = useState('');
    const [id, setId] = useState(new Date().getTime().toString());
    const [imgSrc, setImgSrc] = useState('');

    const [alertText, setAlertText] = useState(initAlert);

    const resetFormParams = () => {
        setFilterType('');
        setAnnotationsText('');
        setId(new Date().getTime().toString());
        setImgSrc('');
    };

    const uploadPhoto = async () => {
        setAlertText(initAlert);

        try {
            const result = await fetch(`/api/photos/upload`, {
                method: 'post',
                body: JSON.stringify({
                    id: id,
                    type: filterType,
                    text: annotationsText,
                    img: imgSrc
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const body = await result.json();
            setAlertText({type: 'success', text: body});
        } catch(err) {
            setAlertText({type: 'danger', text: 'Error uploading photo'});
        }

        resetFormParams();
    }

    return(
        <Container>
            <h1>Take Photo</h1>
            <p>Take a photo and enter some relevant information</p>

            <Alert variant={alertText.type ? alertText.type : null} dismissible
                transition={false}
                show={alertText.text !== null}
                onClose={() => setAlertText(initAlert)}> {alertText.text} </Alert>

            <Row className="justify-content-center">
                <TakePhoto imgSrc={imgSrc} setImgSrc={setImgSrc} />
            </Row>

            <Row className="justify-content-center">
                <Col xs={12} sm={6} md={6} lg={6} xl={4}>
                    <Form>
                     <Form.Group controlId="photoTypeSelect">
                         <Form.Label>Type</Form.Label>
                         <Form.Control as="select"
                             value={filterType}
                             onChange={(event) => setFilterType(event.target.value)}>
                               {validFilterTypes.map((value, key) =>
                                 <option value={value} key={key}>{value}</option>
                               )}
                         </Form.Control>
                     </Form.Group>

                     <Form.Group controlId="photoAnnotationsForm">
                        <Form.Label>Annotations</Form.Label>
                        <Form.Control as="textarea" rows={6} cols={100}
                            value={annotationsText}
                            onChange={(event) => setAnnotationsText(event.target.value)} />
                     </Form.Group>

                     <Button variant="primary"
                        onClick={() => uploadPhoto()}>
                        Upload
                     </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default PhotoUpload;