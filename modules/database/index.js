const Pool = require('pg-pool');

const databaseConfig = require('../../config').databaseConfig;

class DataBase {
    host;
    database;
    user;
    password;
    port;
    schema;

    constructor() {
        this.host = databaseConfig.host;
        this.database = databaseConfig.database;
        this.user = databaseConfig.user;
        this.password = databaseConfig.password;
        this.port = databaseConfig.port;
        this.schema = databaseConfig.schema;
    }

    query = async (sql) => {
        const pool = new Pool({
            host: this.host,
            database: this.database,
            user: this.user,
            password: this.password,
            port: this.port,
            schema: this.schema
        });
        pool.connect();

        let records = await pool.query(sql);
        pool.end();

        return records.rowCount;
    }

    insert = (table, columns, values) => {
        const sql = `INSERT INTO "404"."${table}" ( ${columns} ) VALUES ( ${values} ) RETURNING id;`;
        return this.query(sql);
    }

    selcet = (table, columns, conditions) => {
        let sql = `SELECT ${columns} FROM "404"."${table}" WHERE ${conditions}`;
        if (conditions == undefined)
            sql = `SELECT ${columns} FROM "404"."${table}"`;
        return this.query(sql);
    }

    update = (table, columns, conditions) => {
        return this.query(`UPDATE "404"."${table}" SET ${columns} WHERE ${conditions}`);
    }

    delete = (table, conditions) => {
        return this.query(`DELETE FROM "404"."${table}" WHERE ${conditions}`);
    }
}

module.exports = new DataBase();