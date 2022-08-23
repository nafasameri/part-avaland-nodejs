class Role {
    RoleID;
    RoleName;
    RoleDesc;

    constructor(RoleID, RoleName, RoleDesc) {
        this.RoleID = RoleID;
        this.RoleName = RoleName;
        this.RoleDesc = RoleDesc;
    }

    // findAll(req, res) {
    //     return new Promise((resolve, reject) => {
    //         resolve(roles);
    //     });
    // }

    // findById(id) {
    //     return new Promise((resolve, reject) => {
    //         const role = roles.find((r) => r.RoleID === id);
    //         resolve(role);
    //     });
    // }

    // add(role) {
    //     return new Promise((resolve, reject) => {
    //         roles.push(role);
    //         resolve(role ?.RoleID);
    //     });
    // }
}

module.exports = Role;