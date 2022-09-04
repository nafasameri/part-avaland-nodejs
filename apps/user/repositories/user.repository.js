const User = require("../models/user.model");
const db = require('../../../modules/database');
const datetime = require('../../../modules/utility').datetime;


class UserRepository {
    async fetchAll() {
        const record = await db.selcet('User', '*');
        return record.rows;
    }

    async fetchById(id) {
        const record = await db.selcet('User', '*', `"UserID"=${id}`);
        return record.rows[0];
    }

    async add(user, userID) {
        const userModel = new User(
            0,
            user.UserName ?? '',
            user.UserPhone ?? '',
            user.UserEmail ?? '',
            user.RoleID ?? null,
            userID,
            datetime(),
            userID,
            datetime(),
            0
        );
        const record = await db.insert('User', '"UserName", "UserPhone", "UserEmail", "RoleID", "Creator", "CreateTime", "Modifier", "ModifiTime", "IsDelete"',
            `'${userModel.UserName}', '${userModel.UserPhone}', '${userModel.UserEmail}', '${userModel.RoleID}', ${userModel.Creator}, '${userModel.CreateTime}', ${userModel.Modifier}, '${userModel.ModifiTime}', ${userModel.IsDelete}`);
        return record.rows[0];
    }

    async update(user, userID) {
        user.Modifier = userID;
        user.ModifiTime = datetime();

        const record = await db.update('User', `"UserName"='${user.UserName}', "UserPhone"='${user.UserPhone}', "UserEmail"='${user.UserEmail}', "RoleID"='${user.RoleID}', "Modifier"=${user.Modifier}, "ModifiTime"='${user.ModifiTime}'`,
            `"UserID"=${user.UserID}`);
        return record.rows[0];
    }

    async delete(id, userID) {
        const record = await db.update('User', `"Modifier"=${userID}, "ModifiTime"='${datetime()}', "IsDelete" = 1`, `"UserID"=${id}`);
        return record.rows[0];
    }
}

module.exports = UserRepository;