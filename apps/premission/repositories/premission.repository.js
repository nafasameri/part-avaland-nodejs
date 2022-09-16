const Premission = require("../models/premission.model");
const db = require('../../../modules/database');
const datetime = require('../../../modules/utility').datetime;


class PremissionRepository {
    async fetchAll() {
        const record = await db.selcet('Premission', '*');
        return record.rows;
    }

    async fetchById(id) {
        const record = await db.selcet('Premission', '*', `"PremissionID"=${id}`);
        return record.rows[0];
    }

    async add(premission, userID) {
        let premissionModel = new Premission(
            0,
            premission.RoleID ?? null,
            premission.MusicID ?? null,
            userID,
            datetime(),
            userID,
            datetime(),
            0
        );
        const record = await db.insert('Premission', '"RoleID", "MenuID", "Creator", "CreateTime", "Modifier", "ModifiTime", "IsDelete"',
            `'${premissionModel.RoleID}', '${premissionModel.MenuID}', ${premissionModel.Creator}, '${premissionModel.CreateTime}', ${premissionModel.Modifier}, '${premissionModel.ModifiTime}', ${premissionModel.IsDelete}`);
        return record.rows[0];
    }

    async update(premission, userID) {
        premission.Modifier = userID;
        premission.ModifiTime = datetime();

        const record = await db.update('Premission', `"RoleID"='${premission.RoleID}', "MenuID"='${premission.MenuID}', "Modifier"=${premission.Modifier}, "ModifiTime"='${premission.ModifiTime}'`, `"PremissionID"=${premission.PremissionID}`);
        return record.rows[0];
    }

    async delete(id, userID) {
        const record = await db.update('Premission', `"Modifier"=${userID}, "ModifiTime"='${datetime()}', "IsDelete" = 1`, `"PremissionID"=${id}`);
        return record.rows[0];
    }
}

module.exports = PremissionRepository;