const mongoose = require('mongoose');
const connectionString = `mongodb+srv://ngkhacdai1:CAt0FWhYMFPiKOhU@foodserver.yglwnzn.mongodb.net/foodapp`;

class Database {

    constructor() {
        this.connect();
    }

    connect(type = 'mongodb') {
        mongoose.connect(connectionString, {
            maxPoolSize: 50
        })
            .then(_ => console.log('Connected to MongoDB successfully'))
            .catch(err => console.log('Error connecting to MongoDB:', err));
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

const instanceMongodb = Database.getInstance();
module.exports = instanceMongodb;