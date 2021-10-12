import 'dotenv/config';

const dbConfig = {
  dbConnectionUrl() {
    return `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
    
  },
}

export default dbConfig;
