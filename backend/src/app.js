const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// import api_router from './routes/api.router.js';
const api_router = require('./routes/api.router.js');

const port = 5000;

const app = express();
app.use(cors())
app.use(bodyParser.json())
app.use('/api', api_router)

app.get('*', (req, res) => {
    res.status(404).json('Not a valid rout.');
});

app.listen(port, () => {
    console.log(`Started at http://localhost:${port}`);
});
