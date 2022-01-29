import app from "./server.js"
import mongodb from "mongodb";
import dotenv from "dotenv";
import PartiesDAO from "./dao/partiesDao.js"
import JoinDAO from "./dao/joinDao.js"
import UsersDAO from "./dao/usersDao.js"

dotenv.config();
const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 8000;

MongoClient.connect(
    process.env.RESTREVIEWS_DB_URI,
    {
        maxPoolSize: 50, 
        wtimeoutMS: 2500,
        useNewUrlParser: true
    }
).catch(err => {
    console.error(err.stack);
    process.exit(1);

}).then(async client => {
    await PartiesDAO.injectDB(client);
    await JoinDAO.injectDB(client);
    await UsersDAO.injectDB(client);
    app.listen(port, () => {
        console.log(`Listening on port ${port} ....`);
    })
});
