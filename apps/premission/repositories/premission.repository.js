const Premission = require("../models/premission.model");
const db = require('../../../modules/database');
const datetime = require('../../../modules/utility').datetime;


class PremissionRepository {
    async fetchAll() {
        const record = await db.selcet('Premission', '*');
        const premissions = [];
        record.rows.forEach((row) => {
            premissions.push(new Premission(row).get());
        });
        return premissions;
    }

    async fetchById(id) {
        const record = await db.selcet('Premission', '*', `"PremissionID"=${id}`);
        return record.rows[0] ? new Premission(record.rows[0]).get() : undefined;
    }

    async add(premission, userID) {
        const premissionModel = {
            RoleID: premission["role-id"] ?? null,
            MenuID: premission["menu-id"] ?? null,
            Creator: userID ?? null,
            CreateTime: datetime(),
            Modifier: userID ?? null,
            ModifiTime: datetime(),
            IsDelete: 0
        };
        const record = await db.insert('Premission', '"RoleID", "MenuID", "Creator", "CreateTime", "Modifier", "ModifiTime", "IsDelete"',
            `'${premissionModel.RoleID}', '${premissionModel.MenuID}', ${premissionModel.Creator}, '${premissionModel.CreateTime}', ${premissionModel.Modifier}, '${premissionModel.ModifiTime}', ${premissionModel.IsDelete}`);
        return record.rows[0] ? new Premission(record.rows[0]).get() : undefined;
    }

    async update(premission, userID) {
        const premissionModel = {
            PremissionID: premission["premission-id"] ?? null,
            RoleID: premission["role-id"] ?? null,
            MenuID: premission["menu-id"] ?? null,
            Modifier: userID ?? null,
            ModifiTime: datetime(),
        };
        
        const record = await db.update('Premission', `"RoleID"='${premissionModel.RoleID}', "MenuID"='${premissionModel.MenuID}', "Modifier"=${premissionModel.Modifier}, "ModifiTime"='${premissionModel.ModifiTime}'`, `"PremissionID"=${premissionModel.PremissionID}`);
        return record.rows[0] ? new Premission(record.rows[0]).get() : undefined;
    }

    async delete(id, userID) {
        const record = await db.update('Premission', `"Modifier"=${userID}, "ModifiTime"='${datetime()}', "IsDelete" = 1`, `"PremissionID"=${id}`);
        return record.rows[0] ? new Premission(record.rows[0]).get() : undefined;
    }
}

module.exports = PremissionRepository;