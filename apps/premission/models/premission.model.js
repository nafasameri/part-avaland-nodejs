class Premission {
    #ID;
    #RoleID;
    #MenuID;
    #Creator;
    #CreateTime;
    #Modifier;
    #ModifiTime;
    #IsDelete;

    constructor(premission) {
        this.#ID = premission.PremissionID;
        this.#RoleID = premission.RoleID;
        this.#MenuID = premission.MenuID;
        this.#Creator = premission.Creator;
        this.#CreateTime = premission.CreateTime;
        this.#Modifier = premission.Modifier;
        this.#ModifiTime = premission.ModifiTime;
        this.#IsDelete = premission.IsDelete;
    }

    get() {
        return {
            "premission-id": this.#ID,
            "role-id": this.#RoleID,
            "music-id": this.#MenuID,
            "creator": this.#Creator,
            "creator-time": this.#CreateTime,
            "modifier": this.#Modifier,
            "modifi-time": this.#ModifiTime,
            "delete?": this.#IsDelete
        };
    }
}

module.exports = Premission;