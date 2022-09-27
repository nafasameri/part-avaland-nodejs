const User = require("../models/user.model");
const db = require('../../../modules/database');
const datetime = require('../../../modules/utility').datetime;


class UserRepository {
    async fetchAll() {
        const record = await db.selcet('User', '*');
        const users = [];
        record.rows.forEach((row) => {
            users.push(new User(row).get());
        });
        return users;
    }

    async fetchById(id) {
        const record = await db.selcet('User', '*', `"UserID"=${id}`);
        return new User(record.rows[0]).get();
    }

    async fetchByUserName(username) {
        const record = await db.selcet('User', '*', `"UserName"='${username}'`);
        return record.rows[0] ? new User(record.rows[0]).get() : undefined;
    }

    async fetchByUserNamePassword(username, password) {
        const record = await db.selcet('User', '*', `"UserName"='${username}' AND "Password"='${password}'`);
        return record.rows[0] ? new User(record.rows[0]).get() : undefined;
    }

    async add(user, userID) {
        const userModel = {
            UserName: user.username ?? '',
            UserPhone: user.phone ?? '',
            UserEmail: user.email ?? '',
            Password: user.password ?? '',
            RoleID: user.roleID ?? null,
            Creator: userID ?? null,
            CreateTime: datetime(),
            Modifier: userID ?? null,
            ModifiTime: datetime(),
            IsDelete: 0
        };
        const record = await db.insert('User', '"UserName", "UserPhone", "UserEmail", "Password", "RoleID", "Creator", "CreateTime", "Modifier", "ModifiTime", "IsDelete"',
            `'${userModel.UserName}', '${userModel.UserPhone}', '${userModel.UserEmail}', '${userModel.Password}', '${userModel.RoleID}', ${userModel.Creator}, '${userModel.CreateTime}', ${userModel.Modifier}, '${userModel.ModifiTime}', ${userModel.IsDelete}`);
        return new User(record.rows[0]).get();
    }

    async update(user, userID) {
        const userModel = {
            UserID: user["user-id"] ?? null,
            UserName: user.username ?? '',
            UserPhone: user.phone ?? '',
            UserEmail: user.email ?? '',
            Password: user.password ?? '',
            RoleID: user["role-id"] ?? null,
            Modifier: userID ?? null,
            ModifiTime: datetime(),
            IsDelete: 0
        };
        const record = await db.update('User', `"UserName"='${userModel.UserName}', "UserPhone"='${userModel.UserPhone}', "UserEmail"='${userModel.UserEmail}', "Password"='${userModel.Password}', "RoleID"='${userModel.RoleID}', "Modifier"=${userModel.Modifier}, "ModifiTime"='${userModel.ModifiTime}'`,
            `"UserID"=${userModel.UserID}`);
        return new User(record.rows[0]).get();
    }

    async updatePassword(user, userID) {
        const userModel = {
            UserID: user["user-id"] ?? null,
            Password: user.password ?? '',
            Modifier: userID ?? null,
            ModifiTime: datetime(),
        };
        const record = await db.update('User', `"Password"='${userModel.Password}', "Modifier"=${userModel.Modifier}, "ModifiTime"='${userModel.ModifiTime}'`,
            `"UserID"=${userModel.UserID}`);
        return new User(record.rows[0]).get();
    }

    async delete(id, userID) {
        const record = await db.update('User', `"Modifier"=${userID}, "ModifiTime"='${datetime()}', "IsDelete" = 1`, `"UserID"=${id}`);
        return new User(record.rows[0]).get();
    }
}

module.exports = UserRepository;