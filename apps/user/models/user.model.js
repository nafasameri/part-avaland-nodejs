class User {
    #ID;
    #Name;
    #Phone;
    #Email;
    #Password;
    #RoleID;
    #Creator;
    #CreateTime;
    #Modifier;
    #ModifiTime;
    #IsDelete;

    constructor(user) {
        this.#ID = user.UserID;
        this.#Name = user.UserName;
        this.#Phone = user.UserPhone;
        this.#Email = user.UserEmail;
        this.#Password = user.Password;
        this.#RoleID = user.RoleID;
        this.#Creator = user.Creator;
        this.#CreateTime = user.CreateTime;
        this.#Modifier = user.Modifier;
        this.#ModifiTime = user.ModifiTime;
        this.#IsDelete = user.IsDelete;
    }

    get() {
        return {
            "user-id": this.#ID,
            "username": this.#Name,
            "phone": this.#Phone,
            "email": this.#Email,
            "password": this.#Password,
            "role-id": this.#RoleID,
            "creator": this.#Creator,
            "create-time": this.#CreateTime,
            "modifier": this.#Modifier,
            "modifi-time": this.#ModifiTime,
            "delete?": this.#IsDelete
        };
    }
}

module.exports = User;