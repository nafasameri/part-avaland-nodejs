class Role {
    #ID;
    #Name;
    #Desc;
    #Creator;
    #CreateTime;
    #Modifier;
    #ModifiTime;
    #IsDelete;

    constructor(role) {
        this.#ID = role.RoleID;
        this.#Name = role.RoleName;
        this.#Desc = role.RoleDesc;
        this.#Creator = role.Creator;
        this.#CreateTime = role.CreateTime;
        this.#Modifier = role.Modifier;
        this.#ModifiTime = role.ModifiTime;
        this.#IsDelete = role.IsDelete;
    }

    get() {
        return {
            "role-id": this.#ID,
            "name": this.#Name,
            "description": this.#Desc,
            "creator": this.#Creator,
            "create-time": this.#CreateTime,
            "modifier": this.#Modifier,
            "modifi-time": this.#ModifiTime,
            "delete?": this.#IsDelete
        };
    }
}

module.exports = Role;