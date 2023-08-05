const http = require('http');
const {getUsers, createUser, updateUser, deleteUser} = require('./controllers/userController');

const server = http.createServer((req, res) => {
    if(req.url === '/api/users' && req.method === 'GET') {
        getUsers(req, res);
    }else if(req.url === '/api/users' && req.method === 'POST'){
        createUser(req, res);
    }else if(req.url.match(/\/api\/users\/\w+/) && req.method === 'PUT'){
        const id = req.url.split('/')[3];
        updateUser(req, res, id);
    }else if(req.url.match(/\/api\/users\/\w+/) && req.method === 'DELETE'){
        const name = req.url.split('/')[3];
        deleteUser(req, res, name);
    }else{
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify( {message: 'Route Not Found'}));
    }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));