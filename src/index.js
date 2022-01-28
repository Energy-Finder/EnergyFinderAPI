const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const protocol = process.env.PROTOCOL || "http";
const ip = require('ip').address();
const port = process.env.PORT || 3001;

const routes = require('./routes');
app.use(routes);

app.listen(port, () => console.log(`
    Server started in http://localhost:${port} or ${protocol}://${ip}:${port}
`));