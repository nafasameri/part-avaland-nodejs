const Pool = require('pg-pool');

const config = require('../../config').databaseConfig;


class DataBase {
    #instance = null;
    schema = null;

    constructor(config) {
        if (!this.#instance) {
            this.schema = config.schema;
            this.#instance = new Pool(config);
        }
        // return this.#instance;
    }

    query = async (sql) => {
        // this.#instance.connect();

        let records = await this.#instance.query(sql);
        // pool.end();
        return records;
    }

<<<<<<< HEAD
    selcet(table, columns, conditions) {
        let sql = `SELECT ${columns} FROM "${this.schema}"."${table}" WHERE ${conditions} and "IsDelete"=0`;
        if (conditions == undefined)
            sql = `SELECT ${columns} FROM "${this.schema}"."${table}" WHERE "IsDelete"=0`;
=======
    selcet(table, columns, conditions, IsDelete = 0) {
        let sql = `SELECT ${columns} FROM "${this.schema}"."${table}" WHERE ${conditions} AND "IsDelete"=${IsDelete}`;
        if (conditions == undefined)
            sql = `SELECT ${columns} FROM "${this.schema}"."${table}" WHERE "IsDelete"=${IsDelete}`;

        if (IsDelete == 1) {
            sql = `SELECT ${columns} FROM "${this.schema}"."${table}" WHERE ${conditions}`;
            if (conditions == undefined)
                sql = `SELECT ${columns} FROM "${this.schema}"."${table}"`;
        }
>>>>>>> 0dfd8968264019ec389dea66eb19f2f13730e0fb
        return this.query(sql);
    }

    insert(table, columns, values) {
        const sql = `INSERT INTO "${this.schema}"."${table}" ( ${columns} ) VALUES ( ${values} ) RETURNING *`;
        console.log(sql);
        return this.query(sql);
    }

    update(table, columns, conditions) {
        const sql = `UPDATE "${this.schema}"."${table}" SET ${columns} WHERE ${conditions} RETURNING *`;
        return this.query(sql);
    }

    delete(table, conditions) {
        const sql = `DELETE FROM "${this.schema}"."${table}" WHERE ${conditions}`;
        return this.query(sql);
    }
}

module.exports = new DataBase(config);