const User = require("../models/user.model");
const db = require('../../../modules/database');
const datetime = require('../../../modules/utility').datetime;


class UserRepository {
    async fetchAll() {
        return db.selcet('User', '*');
    }

    async fetchById(id) {
        return db.selcet('User', '*', `"UserID"=${id}`);
    }

    async add(user, userID) {
        const userModel = new User(
            0,
            user.UserName,
            user.UserPhone,
            user.UserEmail,
            user.RoleID,
            userID,
            datetime(),
            userID,
            datetime(),
            0
        );
        const userRow = db.insert('User', '"UserName", "UserPhone", "UserEmail", "RoleID", "Creator", "CreateTime", "Modifier", "ModifiTime", "IsDelete"',
            `'${userModel.UserName}', '${userModel.UserPhone}', '${userModel.UserEmail}', '${userModel.RoleID}', ${userModel.Creator}, '${userModel.CreateTime}', ${userModel.Modifier}, '${userModel.ModifiTime}', ${userModel.IsDelete}`);
        return userRow;
    }

    async update(user, userID) {
        user.Modifier = userID;
        user.ModifiTime = datetime();

        return db.update('User', `"UserName"='${user.UserName}', "UserPhone"='${user.UserPhone}', "UserEmail"='${user.UserEmail}', "RoleID"='${user.RoleID}', "Modifier"=${user.Modifier}, "ModifiTime"='${user.ModifiTime}'`, 
            `"UserID"=${user.UserID}`);
    }

    async delete(id, userID) {
        return db.update('User', `"Modifier"=${userID}, "ModifiTime"='${datetime()}', "IsDelete" = 1`, `"UserID"=${id}`);
    }
}

module.exports = UserRepository;