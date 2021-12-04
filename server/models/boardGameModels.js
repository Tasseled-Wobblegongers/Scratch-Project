import { Pool } from 'pg';


const PG_URI = `postgres://pukrkzqc:e_TeFYvSC7eGaUJ7wTYCq5vQftlxFDA2@kashin.db.elephantsql.com/pukrkzqc`
/// url --> postgres://pukrkzqc:e_TeFYvSC7eGaUJ7wTYCq5vQftlxFDA2@kashin.db.elephantsql.com/pukrkzqc

// Schems for the database can be found below:
// <url for the picture goes here>

const pool = new Pool({
    connectionString: PG_URI
});

export default {
    query: (text, params, callback) => {
        console.log('executed query', text);
        return pool.query(text, params, callback);
    }
};






