import React, {useState, useEffect} from 'react';
import PageNotFound from '../components/PageNotFound';
import Container from 'react-bootstrap/Container';

const Photo = ({ match }) => {
    const id = match.params.id;

    const [photoInfo, setPhotoInfo] = useState({
        id: null,
        text: null,
        type: null,
        img: null
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetch(`/api/photos/byId/${id}`);
                const body = await result.json();
                setPhotoInfo(body);
            } catch(err) {
                console.log('Error retrieving photo by id')
            }
        }
        fetchData();
    }, [id]); /** whenever the id changes **/

    if (!id) return <PageNotFound />;

    return(
        <Container>
            <h2>Photo ID: {photoInfo.id}</h2>
            <h3>Type: {photoInfo.type ? photoInfo.type : 'N/A'}</h3>

            <img src={photoInfo.img} alt='' />

            <h4>Annotations</h4>
            <p>{photoInfo.text}</p>
        </Container>
    );
}

export default Photo;