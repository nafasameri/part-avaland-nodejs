const Role = require("../models/role.model");
const rolesDataStore = require("./roles.json");

class RoleRepository {
    async fetchAll() {
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
        for (let role of rolesDataStore) {
            if (role.RoleID == id) {
                let roleModel = new Role(
                    role.RoleID,
                    role.RoleName,
                    role.RoleDesc
                );
                return roleModel;
            }
        }
        return null;
    }

    async add(role) {        
        let roleModel = new Role(
            role.RoleID,
            role.RoleName,
            role.RoleDesc
        );
        rolesDataStore.push(roleModel);        
        return roleModel.RoleID;
    }
}

module.exports = RoleRepository;
