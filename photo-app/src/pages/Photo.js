import React, {useState, useEffect} from 'react';
import PageNotFound from '../components/PageNotFound';
import Container from 'react-bootstrap/Container';

const Photo = ({ match }) => {
    const id = match.params.id;
    const initPhotoInfo = {
        id: id,
        text: null,
        type: null,
        img: null
    }
    const [photoInfo, setPhotoInfo] = useState(initPhotoInfo);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetch(`/api/photos/byId/${photoInfo.id}`);
                const body = await result.json();

                if(result.status === 200) {
                    setPhotoInfo(body);
                } else {
                    console.log('Error retrieving photo by id');
                    setPhotoInfo({id: null, text: null, type: null, img: null});
                }
            } catch(err) {
                console.log('Error retrieving photo by id ' + err)
            }
        }
        fetchData();
    }, [photoInfo.id]); /** whenever the id changes **/

    if (!photoInfo.id) return <PageNotFound />;

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