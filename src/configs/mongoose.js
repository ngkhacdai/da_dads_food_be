

const dev ={
    app:{
        port:process.env.DEV_APP_PORT
    },
    db:{
        username:process.env.DEV_DB_USERNAME,
        password:process.env.DEV_DB_PASSWORD,
        clustername: process.env.DEV_DB_CLUSTERNAME,
        databasename: process.env.DEV_DB_DATABASENAME
    }
}
const config = {dev};
const env = process.env.NODE_ENV || 'dev';
module.exports = config[env];
