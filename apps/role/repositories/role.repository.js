const Role = require("../models/role.model");
const db = require('../../../modules/database');
const datetime = require('../../../modules/utility').datetime;


class RoleRepository {
    async fetchAll() {
        const record = await db.selcet('Role', '*');
        const roles = [];
        record.rows.forEach((row) => {
            roles.push(new Role(row).get());
        });
        return roles;
    }

    async fetchById(id) {
        const record = await db.selcet('Role', '*', `"RoleID"=${id}`);
        return record.rows[0] ? new Role(record.rows[0]).get() : undefined;
    }

    async add(role, userID) {
        const roleModel = {
            RoleName: role.name ?? '',
            RoleDesc: role.description ?? '',
            Creator: userID,
            CreateTime: datetime(),
            Modifier: userID,
            ModifiTime: datetime(),
            IsDelete: 0
        };
        const record = await db.insert('Role', '"RoleName", "RoleDesc", "Creator", "CreateTime", "Modifier", "ModifiTime", "IsDelete"',
            `'${roleModel.RoleName}', '${roleModel.RoleDesc}', ${roleModel.Creator}, '${roleModel.CreateTime}', ${roleModel.Modifier}, '${roleModel.ModifiTime}', ${roleModel.IsDelete}`);
        return record.rows[0] ? new Role(record.rows[0]).get() : undefined;
    }

    async update(role, userID) {
        const roleModel = {
            RoleID: role["role-id"],
            RoleName: role.name ?? '',
            RoleDesc: role.description ?? '',
            Modifier: userID,
            ModifiTime: datetime(),
        };

        const record = await db.update('Role', `"RoleName"='${roleModel.RoleName}', "RoleDesc"='${roleModel.RoleDesc}', "Modifier"=${roleModel.Modifier}, "ModifiTime"='${roleModel.ModifiTime}'`,
            `"RoleID"=${roleModel.RoleID}`);
        return record.rows[0] ? new Role(record.rows[0]).get() : undefined;
    }

    async delete(id, userID) {
        const record = await db.update('Role', `"Modifier"=${userID}, "ModifiTime"='${datetime()}', "IsDelete" = 1`, `"RoleID"=${id}`);
        return record.rows[0] ? new Role(record.rows[0]).get() : undefined;
    }
}

module.exports = RoleRepository;