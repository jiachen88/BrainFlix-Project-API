const express = require('express');
const app = express();
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const { title } = require('process');

app.use(express.static('public'))
app.use(express.json());
app.use(cors());

function LoadVideoData() {
    const videoData = fs.readFileSync('./data/video-details.json', 'utf8');
    return JSON.parse(videoData);
};

function UploadNewVideo(newVideo) {
    const videos = LoadVideoData();
    videos.push(newVideo);
    fs.writeFileSync('./data/video-details.json', JSON.stringify(videos));
    return 'Video Uploaded Successfully'
};


app.get('/', function (req, res) {
    res.send('Hello World')
});

app.get('/videos', function (req, res) {
    res.json(LoadVideoData());
});

app.get('/videos/:id', function (req, res) {
    const videos = LoadVideoData();
    const foundVideo = videos.find((video) => {
        return video.id === req.params.id;
    });
    res.status(200).json(foundVideo);
});


app.post('/videos', function (req, res) {
    // Should be req.body.title req.body.description
    if (req.body.title, req.body.description) {
        let newVideo = {
            id: uuidv4(),
            channel: 'BrainFlix',
            image: 'http://localhost:5000/images/Mohan-muruge.jpg',
            title: req.body.title,
            description: req.body.description,
            views: '0',
            likes: '0',
            duration: '4:05',
            video: 'https://project-2-api.herokuapp.com/stream',
            timestamp: Date.now(),
            comments: []
        };
        res.status(201).send(UploadNewVideo(newVideo));
    } else {
        res.send('Please fill out form')
    }
});

app.listen(5000, function () {
    console.log('server running at http://localhost:' + 5000)
});