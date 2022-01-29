const app = require('./server');

const ip = require('ip').address();
const protocol = process.env.PROTOCOL || "http";
const port = 3001;

app.listen(port, () => console.log(`
    Server started in http://localhost:${port} or ${protocol}://${ip}:${port}
`));