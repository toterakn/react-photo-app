import {useState, useEffect} from 'react'
import PhotoListGroup from '../components/PhotoListGroup'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { PhotoInfo, VALID_FILTER_TYPES } from '../config/PhotoConfig'

const PhotoList = () => {
    const [photoList, setPhotoList] = useState<PhotoInfo[]>([])
    const [filterType, setFilterType] = useState<string>('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetch(`/api/photos/all`)
                const body = await result.json()
                
                if(result.status === 200) {
                    setPhotoList(body)
                } else {
                    console.log(result)
                    setPhotoList([])
                }
            } catch(err) {
                console.log('Error getting all photos')
                setPhotoList([])
            }
        }
        fetchData()
    }, [])

    return(
        <Container>
            <h1 className='my-3'>All Photos</h1>

            <Row className='justify-content-center'>
                <Col xs={12} sm={6} md={3} lg={3} xl={3}>
                    <Form>
                      <Form.Group controlId='filterSelect'>
                        <Form.Label>Filter By</Form.Label>
                        <Form.Control as='select'
                            value={filterType}
                            onChange={(event) => setFilterType(event.target.value)}>
                          {VALID_FILTER_TYPES.map((value, key) =>
                            <option value={value} key={key}>{value}</option>
                          )}
                        </Form.Control>
                      </Form.Group>
                    </Form>
                </Col>
            </Row>

            <PhotoListGroup photos={photoList} filterType={filterType} />
        </Container>
    )
}

export default PhotoList