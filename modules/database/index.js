const Pool = require('pg-pool');

const config = require('../../config').databaseConfig;
const logger = require('../logger');

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
        try {
            return await this.#instance.query(sql);
        } catch (error) {
            logger.error(`query: "${sql}" message: ${error}`);
            throw error;
        }
    }

    selcet(table, columns, conditions, IsDelete = 0) {
        let sql = `SELECT ${columns} FROM "${this.schema}"."${table}" WHERE ${conditions} AND "IsDelete"=${IsDelete}`;
        if (conditions == undefined)
            sql = `SELECT ${columns} FROM "${this.schema}"."${table}" WHERE "IsDelete"=${IsDelete}`;

        if (IsDelete == 1) {
            sql = `SELECT ${columns} FROM "${this.schema}"."${table}" WHERE ${conditions}`;
            if (conditions == undefined)
                sql = `SELECT ${columns} FROM "${this.schema}"."${table}"`;
        }
        return this.query(sql);
    }

    insert(table, columns, values) {
        const sql = `INSERT INTO "${this.schema}"."${table}" ( ${columns} ) VALUES ( ${values} ) RETURNING *`;
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

    join(table1, table2, key, columns, conditions, IsDelete = 0) {
        let sql = `SELECT ${columns} FROM "${this.schema}"."${table1}" 
         JOIN "${this.schema}"."${table2}" ON "${table1}"."${key}" = "${table2}"."${key}"
         WHERE ${conditions} 
         AND "${table1}"."IsDelete"=${IsDelete} AND "${table2}"."IsDelete"=${IsDelete}`;

        return this.query(sql);
    }
}

module.exports = new DataBase(config);