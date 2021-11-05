const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/dist'))
    .get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    })
    .listen(PORT, () => {
        console.log(`Example app listening on port ${PORT}!`);
    });
