import React, {useRef, useEffect, useState, useCallback, Dispatch, SetStateAction} from 'react';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

interface Props {
    imgSrc?: string | null
    setImgSrc: Dispatch<SetStateAction<string | null | undefined>>
}

const WIDTH = 320
const HEIGHT = 240

const TakePhoto = ({ imgSrc, setImgSrc }: Props) => {
    const [errorText, setErrorText] = useState<string>('')

    const videoRef = useRef<HTMLVideoElement>(null)
    const photoRef = useRef<HTMLCanvasElement>(null)

    const startCamera = useCallback(async () => {
        await navigator.mediaDevices.getUserMedia({video: {width: WIDTH, height: HEIGHT}}).then(
            (stream) => {
                if(videoRef.current === null) return
                videoRef.current.srcObject = stream
                videoRef.current.play()
            },
            (err) => {
                console.log(err)
                stopCamera()
                setErrorText(err.toString())
            }
        )
    }, []);

    useEffect(() => {
        if(!imgSrc){
            if(videoRef.current === null) return
            videoRef.current.srcObject = null
            startCamera()
        }
    }, [imgSrc, startCamera])

    const stopCamera = () => {
        if(videoRef.current) {
            videoRef.current.width = 0
            videoRef.current.height = 0
        }
    }

    const takePhoto = () => {
        let video = videoRef.current
        let photo = photoRef.current
        
        if(photo && video) {
            let ctx = photo.getContext('2d')

            photo.width = WIDTH
            photo.height = HEIGHT
    
            if (ctx) ctx.drawImage(video, 0, 0, WIDTH, HEIGHT)
    
            const data = photo.toDataURL("image/jpeg")
            setImgSrc(data)
    
            stopCamera()
        }
    };

    const clearPhoto = () => {
        if(photoRef.current === null) return
        photoRef.current.width = 0
        photoRef.current.height = 0
        setImgSrc(null)
    };

    return(
        <Container>

            <Row className="justify-content-center">
                <video ref={videoRef} hidden={imgSrc !== null && imgSrc !== undefined}/>
            </Row>

            <Row className="justify-content-center">
                <canvas ref={photoRef} hidden={!imgSrc} />
            </Row>


            {
            imgSrc ?
            <Row className='justify-content-center extra-margin'>
                 <Button variant='primary'
                    onClick={() => clearPhoto()}>
                    Clear Photo
                </Button>
            </Row> :
            <Row className='justify-content-center extra-margin'>
                  <Button variant='primary'
                    disabled={errorText !== ''}
                    onClick={() => takePhoto()}>
                    Take Photo
                 </Button>
             </Row>
            }

            <Row className='justify-content-center extra-margin'>
                <Alert variant='danger' dismissible
                    transition={false}
                    show={errorText !== ''}
                    onClose={() => setErrorText('')}> {errorText} </Alert>
            </Row>

        </Container>
    )
}

export default TakePhoto