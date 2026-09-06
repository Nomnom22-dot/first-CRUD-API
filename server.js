const http = require('http');
const fs = require('fs');
const low = require('lodash');

const server = http.createServer((req, res) => {
    

    // lodash
    const num = low.random(0, 20);
    console.log(num);

    const greet = low.once(() => {
        console.log('hello');
    })

    greet();
    greet();

    //set header content type
res.setHeader('Content-Type', 'text/html');


let path = './views/';
    switch(req.url){
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-here':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }



   fs.readFile(path, (err, data) => {
    if(err){
        console.log(err);
    }
    else{
        res.write(data);
        res.end();
    }
   });
});

server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000')
});
