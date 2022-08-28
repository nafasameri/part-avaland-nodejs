const Role = require("../models/role.model");
const db = require('../../../modules/database');
const datetime = require('../../../modules/utility').datetime;


class RoleRepository {
    async fetchAll() {
        const roles = db.selcet('Role', '*');
        return roles;
    }

    async fetchRole(id) {
        const role = db.selcet('Role', '*', `RoleID=${id}`);
        return role;
    }

    async add(role) {
        let roleModel = new Role(
            0,
            role.RoleName,
            role.RoleDesc,
            null,
            datetime(),
            null,
            datetime(),
            0
        );
        console.log(roleModel);

        const roleID = db.insert('Role', '"RoleName", "RoleDesc", "Creator", "CreateTime", "Modifier", "ModifiTime", "IsDelete"',
            `'${roleModel.RoleName}', '${roleModel.RoleDesc}', ${roleModel.Creator}, '${roleModel.CreateTime}',
             ${roleModel.Modifier}, '${roleModel.ModifiTime}', ${roleModel.IsDelete}`);
        return roleID;
    }
}

module.exports = RoleRepository;