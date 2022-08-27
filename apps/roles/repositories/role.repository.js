const Role = require("../models/role.model");
const db = require('../../../modules/database');
const datetime = require('../../../modules/utility').datetime;


class RoleRepository {
    async fetchAll() {
        console.log(db.selcet('Role', '*'));
        
        const rolesDataStore = db.selcet('Role', '*');
        // console.log(rolesDataStore);
        
        const roles = [];
        for (let role of rolesDataStore) {
            let roleModel = new Role(
                role.RoleID,
                role.RoleName,
                role.RoleDesc
            );
            roles.push(roleModel);
        }
        return roles;
    }

    async fetchRole(id) {
        const role = db.selcet('Role', '*', `RoleID=${id}`);
        let roleModel = new Role(
            role.RoleID,
            role.RoleName,
            role.RoleDesc
        );
        return roleModel;
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
        
        db.insert('Role', 'RoleName, RoleDesc, Creator, CreateTime, Modifier, ModifiTime, IsDelete',`"${roleModel.RoleName}", "${roleModel.RoleDesc}", ${roleModel.Creator}, "${roleModel.CreateTime}",
         ${roleModel.Modifier}, "${roleModel.ModifiTime}", ${roleModel.IsDelete}`);
        return roleModel.RoleID;
    }
}

module.exports = RoleRepository;