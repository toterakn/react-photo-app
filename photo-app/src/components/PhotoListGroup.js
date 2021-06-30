import React from 'react';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';

const PhotoListGroup = ({ photos, filterType }) => {
    return(
        <>
        <ListGroup>
            {photos.filter(photo => !filterType || photo.type === filterType).map((photo, key) => (
                <ListGroup.Item action as={Link} key={key} to={`/photo/${photo.id}`} className="justify-content-center">
                    <h4>Photo ID: {photo.id} ({photo.type ? photo.type : 'N/A'})</h4>
                    <p>{photo.text.substring(0, 150)} ...</p>
                    { photo.img ? <span className="photo-sm"><img src={photo.img} alt='' /></span> : 'Image N/A' }
                </ListGroup.Item>
            ))}
        </ListGroup>
        </>
    )
}

export default PhotoListGroup;