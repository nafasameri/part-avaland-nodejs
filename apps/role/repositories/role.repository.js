const Role = require("../models/role.model");
const db = require('../../../modules/database');
const datetime = require('../../../modules/utility').datetime;


class RoleRepository {
    async fetchAll() {
        const record = await db.selcet('Role', '*');
        return record.rows;
    }

    async fetchById(id) {
        const record = await db.selcet('Role', '*', `"RoleID"=${id}`);
        return record.rows[0];
    }

    async add(role, userID) {
        const roleModel = new Role(
            0,
            role.RoleName ?? '',
            role.RoleDesc ?? '',
            userID,
            datetime(),
            userID,
            datetime(),
            0
        );
        const record = await db.insert('Role', '"RoleName", "RoleDesc", "Creator", "CreateTime", "Modifier", "ModifiTime", "IsDelete"',
            `'${roleModel.RoleName}', '${roleModel.RoleDesc}', ${roleModel.Creator}, '${roleModel.CreateTime}', ${roleModel.Modifier}, '${roleModel.ModifiTime}', ${roleModel.IsDelete}`);
        return record.rows[0];
    }

    async update(role, userID) {
        role.Modifier = userID;
        role.ModifiTime = datetime();

        const record = await db.update('Role', `"RoleName"='${role.RoleName}', "RoleDesc"='${role.RoleDesc}', "Modifier"=${role.Modifier}, "ModifiTime"='${role.ModifiTime}'`,
            `"RoleID"=${role.RoleID}`);
        return record.rows[0];
    }

    async delete(id, userID) {
        const record = await db.update('Role', `"Modifier"=${userID}, "ModifiTime"='${datetime()}', "IsDelete" = 1`, `"RoleID"=${id}`);
        return record.rows[0];
    }
}

module.exports = RoleRepository;