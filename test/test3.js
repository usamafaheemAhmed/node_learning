const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromise = require('fs').promises;

//defining Port
const PORT = process.env.PORT || 7000;


const server = http.createServer((req, res) => {
    console.log(req.url, req.method);
    let newPath;
    if (req.url === "/" || req.url === "index.html") {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        newPath = path.join(__dirname, '../view', 'index.html');
        fs.readFile(newPath, 'utf-8', (err, data) => {
            res.end(data);
        })
    }

})

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

