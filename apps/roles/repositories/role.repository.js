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
}

module.exports = RoleRepository;
