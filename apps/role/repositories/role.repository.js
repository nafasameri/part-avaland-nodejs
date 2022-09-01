const Role = require("../models/role.model");
const db = require('../../../modules/database');
const datetime = require('../../../modules/utility').datetime;


class RoleRepository {
    async fetchAll() {
        return db.selcet('Role', '*');
    }

    async fetchById(id) {
        return db.selcet('Role', '*', `"RoleID"=${id}`);
    }


    async add(role, userID) {
        const roleModel = new Role(
            0,
            role.RoleName,
            role.RoleDesc,
            userID,
            datetime(),
            userID,
            datetime(),
            false
        );
        const roleRow = db.insert('Role', '"RoleName", "RoleDesc", "Creator", "CreateTime", "Modifier", "ModifiTime", "IsDelete"',
            `'${roleModel.RoleName}', '${roleModel.RoleDesc}', ${roleModel.Creator}, '${roleModel.CreateTime}', ${roleModel.Modifier}, '${roleModel.ModifiTime}', ${roleModel.IsDelete}`);
        return roleRow;
    }

    async update(role, userID) {
        role.Modifier = userID;
        role.ModifiTime = datetime();

        return db.update('Role', `"RoleName"='${role.RoleName}', "RoleDesc"='${role.RoleDesc}', "Modifier"=${role.Modifier}, "ModifiTime"='${role.ModifiTime}'`,
            `"RoleID"=${role.RoleID}`);
    }

    async delete(id, userID) {
        return db.update('Role', `"Modifier"=${userID}, "ModifiTime"='${datetime()}', "IsDelete" = 1`, `"RoleID"=${id}`);
    }
}

module.exports = RoleRepository;