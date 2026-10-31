import mongoose from "mongoose";
import 'dotenv/config'
import logger from '../Utils/logger.js'

const db_url = process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URL
    : process.env.MONGODB_URL;
const PORT = process.env.PORT

const connectDB = () => {

    mongoose.connect(db_url, { family: 4 })
        .then(() => logger.info('connected to DB', db_url))
        .catch(logger.error('cannot connect to database'));
}
const disconnectDB = () => {
    mongoose.connection.close().then(() => { logger.info('Disconnected') });
}

export { connectDB, disconnectDB, PORT }