import {Pool} from 'pg'

const pool = Pool({
    connectionString: process.env.DATABASE_URL
})