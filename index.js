const server = require('./server');

const port = 5000;
const host = 'localhost';

server.listen(port, () => {
    console.log(`Server is listening on ${host}://${port}`)
});