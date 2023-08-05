const User = require('../models/userModel');
const {getPostData} = require('../utils');
const { MongoClient } = require("mongodb");

// Get All Users
// Route GET /api/users
async function getUsers(req, res){
    try {
        const uri = "mongodb+srv://demo:mongo@cluster0.vw5ddrm.mongodb.net/?retryWrites=true&w=majority";
        const client = new MongoClient(uri);
        client.connect();
        const db = client.db("Users_DB");
        const coll = db.collection("Users");
        const cursor = coll.find();
        const list = await cursor.toArray();
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(list));
    }catch (error) {
        console.log(error);
    }
}

// Create a User
// Route POST /api/users
async function createUser(req, res){
    try {
        const body = await getPostData(req);
        const {id, name, address} = JSON.parse(body);
        const user = {
            id,
            name,
            address
        }
        const newUser = await User.create(user);
        res.writeHead(201, {'Content-Type': 'application/json'});
        return res.end(JSON.stringify(newUser));

    }catch (error) {
        console.log(error);
    }
}

// Update a User
// Route PUT /api/users/:id
async function updateUser(req, res, id){
    try {
            const body = await getPostData(req);
            const {id, name, address} = JSON.parse(body);
            const userData = {
                id: id,
                name: name,
                address: address
            }
            const updUser = await User.update(id, userData);
            res.writeHead(200, {'Content-Type': 'application/json'});
            return res.end(JSON.stringify(updUser));
    }catch (error) {
        console.log(error);
    }
}

// Delete a User
// Route DELETE /api/users/:id
async function deleteUser(req, res, name){
    try {
            await User.remove(name);
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: `User id ${name} deleted`}));
    }catch (error) {
        console.log(error);
    }
}

module.exports = {getUsers, createUser, updateUser, deleteUser}