const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs')
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

app.get('/videos/:videoId', function (req, res) {
    const foundVideo = videos.find((videos) => {
        return videos.id === req.params.id;
    });
    res.status(200).json(foundVideo);
});


app.listen(5000, function () {
    console.log('server running at http://localhost:' + 5000)
});