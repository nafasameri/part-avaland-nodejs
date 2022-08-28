const Pool = require('pg-pool');

const databaseConfig = require('../../config').databaseConfig;

class DataBase {
    constructor(config) {
        this.host = config.host;
        this.database = config.database;
        this.user = config.user;
        this.password = config.password;
        this.port = config.port;
        this.schema = config.schema;
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
        // pool.end();
        return records;
    }

    selcet = (table, columns, conditions) => {
        let sql = `SELECT ${columns} FROM "404"."${table}" WHERE ${conditions}`;
        if (conditions == undefined)
            sql = `SELECT ${columns} FROM "404"."${table}"`;
        return this.query(sql);
    }

    insert = (table, columns, values) => {
        const sql = `INSERT INTO "404"."${table}" ( ${columns} ) VALUES ( ${values} ) RETURNING *`;
        console.log(sql);

        // this.query(sql).then((record) => {
        // return record.rows;
        // });
        return this.query(sql);
    }

    update = (table, columns, conditions) => {
        const sql = `UPDATE "404"."${table}" SET ${columns} WHERE ${conditions}`;
        console.log(sql);

        return this.query(sql);
    }

    delete = (table, conditions) => {
        const sql = `DELETE FROM "404"."${table}" WHERE ${conditions}`;
        console.log(sql);

        return this.query(sql);
    }
}

module.exports = new DataBase(databaseConfig);