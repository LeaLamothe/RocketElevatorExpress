const http = require('http');

//req=request res=response
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('Hello World');
        res.end();
    }
        if (req.url === '/api/courses') {
            res.write(JSON.stringify([1, 2, 3]));
            res.end();
        }
    });

    server.listen(3000);


    