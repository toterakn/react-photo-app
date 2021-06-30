import React, {useRef, useEffect, useState, useCallback} from 'react';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

const TakePhoto = ({ imgSrc, setImgSrc }) => {
    const width = 320;
    const height = 240;

    const [errorText, setErrorText] = useState('');

    const videoRef = useRef(null);
    const photoRef = useRef(null);

    const startCamera = useCallback(async () => {
        await navigator.mediaDevices.getUserMedia({video: {width: width, height: height}}).then(
            (stream) => {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            },
            (err) => {
                console.log(err);
                stopCamera();
                setErrorText(err.toString());
            }
        )
    }, []);

    useEffect(() => {
        if(!imgSrc){
          startCamera();
        }
    }, [imgSrc, startCamera]);

    const stopCamera = () => {
        if(videoRef.current && videoRef.current.srcObj) {
            videoRef.current.width = 0;
            videoRef.current.height = 0;
        }
    }

    const takePhoto = () => {
        let video = videoRef.current;
        let photo = photoRef.current;
        let ctx = photo.getContext('2d');

        photo.width = width;
        photo.height = height;

        ctx.drawImage(video, 0, 0, width, height);

        const data = photo.toDataURL("image/jpeg");
        setImgSrc(data);

        stopCamera();
    };

    const clearPhoto = () => {
        photoRef.current.width = 0;
        photoRef.current.height = 0;
        setImgSrc('');
    };

    return(
        <Container>

            <Row className="justify-content-center">
                <video ref={videoRef} hidden={imgSrc} />
            </Row>

            <Row className="justify-content-center">
                <canvas ref={photoRef} hidden={!imgSrc} />
            </Row>


            {
            imgSrc ?
            <Row className="justify-content-center extra-margin">
                 <Button variant="primary"
                    onClick={() => clearPhoto()}>
                    Clear Photo
                </Button>
            </Row> :
            <Row className="justify-content-center extra-margin">
                  <Button variant="primary"
                    disabled={errorText}
                    onClick={() => takePhoto()}>
                    Take Photo
                 </Button>
             </Row>
            }

            <Row className="justify-content-center extra-margin">
                <Alert variant='danger' dismissible
                    transition={false}
                    show={errorText}
                    onClose={() => setErrorText('')}> {errorText} </Alert>
            </Row>

        </Container>
    );
};

export default TakePhoto;