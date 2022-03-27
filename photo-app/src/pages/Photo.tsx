import {useState, useEffect} from 'react'
import PageNotFound from '../components/PageNotFound'
import Container from 'react-bootstrap/Container'
import { PhotoInfo } from '../config/PhotoConfig'

interface Props {
    match: {
        params: {
            id: string
        }
    }
}

const Photo = ({ match }: Props) => {
    const id = match.params.id
    const initPhotoInfo = {
        id: id,
        text: '',
        type: '',
        img: ''
    }

    const [photoInfo, setPhotoInfo] = useState<PhotoInfo>(initPhotoInfo)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetch(`/api/photos/byId/${photoInfo.id}`)
                const body = await result.json()

                if(result.status === 200) {
                    setPhotoInfo(body)
                } else {
                    console.log('Error retrieving photo by id')
                    setPhotoInfo({id: '', text: '', type: '', img: ''})
                }
            } catch(err) {
                console.log('Error retrieving photo by id ' + err)
            }
        }
        fetchData()
    }, [photoInfo.id]) /** whenever the id changes **/

    if (!photoInfo.id) return <PageNotFound />

    return(
        <Container>
            <h2 className='my-3'>Photo ID: {photoInfo.id}</h2>
            <h3>Type: {photoInfo.type !== '' ? photoInfo.type : 'N/A'}</h3>

            {photoInfo.img !== '' && <img src={photoInfo.img} alt='' />}

            <h4>Annotations</h4>
            <p>{photoInfo.text}</p>
        </Container>
    )
}

export default Photo