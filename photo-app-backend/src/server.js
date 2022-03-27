import express from 'express';
import bodyParser from 'body-parser';
import {MongoClient} from 'mongodb';

const app = express();

app.use(bodyParser.json());

const withDB = async (operations, res) => {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true});
        const db = client.db('photo-app');

        await operations(db);

        client.close();
    } catch (error) {
        res.status(500).json({message: 'Error connecting to db', error});
    }
}

//Get all photos
app.get('/api/photos/all', (req, res) => {
    withDB(async (db) => {
        const allPhotos = await db.collection('photos').find().toArray();
        res.status(200).json(allPhotos);
    }, res);
});

//Get photo by id
app.get('/api/photos/byId/:id', async (req, res) => {
    withDB(async (db) => {
        const photoId = req.params.id;
        const photoInfo = await db.collection('photos').findOne({id: photoId});

        if(photoInfo === null) {
           res.status(404).json(`Could not find photo information for id: ${photoId}`);
        } else {
            res.status(200).json(photoInfo);
        }
    }, res);
});

//Get photo by type (seflie, regular)
app.get('/api/photos/byType/:type', async (req, res) => {
    withDB(async (db) => {
        const photoType = req.params.type;
        const photoInfo = await db.collection('photos').find({type: photoType}).toArray();

        if(photoInfo === null) {
           res.status(404).json(`Could not find photo information for type: ${photoType}`);
        } else {
            res.status(200).json(photoInfo);
        }
    }), res;
});

//Update photo info (specifically the text) by id
app.post('/api/photos/update/:id', async (req, res) => {
    withDB(async (db) => {
        const photoId = req.params.id;
        const photoInfo = req.body;

        await db.collection('photos').updateOne(
            {id: photoId},
            {
                '$set': {
                    text: photoInfo.text
                }
            }
        );

        const updatedPhotoInfo = await db.collection('photos').findOne({id: photoId});
        res.status(200).json(updatedPhotoInfo);
    }, res);
});

//Upload photo
app.post('/api/photos/upload', (req, res) => {
    withDB(async (db) => {
        const photoId = req.body.id;
        const photoInfo = req.body;

        await db.collection('photos').insertOne(photoInfo);
        res.status(200).json(`Photo (ID: ${photoId}) has been successfully uploaded`);
    }, res);
});

app.listen(8000, () => console.log('Listening on port 8000'));