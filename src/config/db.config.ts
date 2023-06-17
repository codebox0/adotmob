import {config} from 'dotenv';
config();


const {
    MONGODB_HOST,
    MONGODB_USER,
    MONGODB_PASSWORD,
    MONGODB_DATABASE,
    MONGODB_LOCAL_PORT,
} = process.env;

const MongoUrl = {
    url: `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_LOCAL_PORT}/${MONGODB_DATABASE}?authSource=admin`
}

export {
    MongoUrl
}


