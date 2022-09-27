const History = require("../models/history.model");
const db = require('../../../modules/database');
const datetime = require('../../../modules/utility').datetime;


class HistoryRepository {
    async fetchAll() {
        const record = await db.selcet('History', '*');
        const histories = [];
        record.rows.forEach((row) => {
            histories.push(new History(row).get());
        });
        return histories;
    }

    async fetchById(id) {
        const record = await db.selcet('History', '*', `"HistoryID"=${id}`);
        return record.rows[0] ? new History(record.rows[0]).get() : undefined;
    }

    async fetchByUser(id) {
        const record = await db.selcet('History', '*', `"UserID"=${id}`, 1);
        const histories = [];
        record.rows.forEach((row) => {
            histories.push(new History(row).get());
        });
        return histories;
    }

    async fetchByMusic(id) {
        const record = await db.selcet('History', '*', `"MusicID"=${id}`);
        const histories = [];
        record.rows.forEach((row) => {
            histories.push(new History(row).get());
        });
        return histories;
    }

    async add(history, userID) {
        const historyModel = {
            UserID: history["user-id"] ?? null,
            MusicID: history["music-id"] ?? null,
            Creator: userID,
            CreateTime: datetime(),
            Modifier: userID,
            ModifiTime: datetime(),
            IsDelete: 0
        };
        const record = await db.insert('History', '"UserID", "MusicID", "Creator", "CreateTime", "Modifier", "ModifiTime", "IsDelete"',
            `'${historyModel.UserID}', '${historyModel.MusicID}', ${historyModel.Creator}, '${historyModel.CreateTime}', ${historyModel.Modifier}, '${historyModel.ModifiTime}', ${historyModel.IsDelete}`);
        return record.rows[0] ? new History(record.rows[0]).get() : undefined;
    }

    async update(history, userID) {
        const historyModel = {
            id: history["history-id"] ?? null,
            UserID: history["user-id"] ?? null,
            MusicID: history["music-id"] ?? null,
            Modifier: userID,
            ModifiTime: datetime(),
        };

        const record = await db.update('History', `"UserID"='${historyModel.UserID}', "MusicID"='${historyModel.MusicID}', "Modifier"=${historyModel.Modifier}, "ModifiTime"='${historyModel.ModifiTime}'`, `"HistoryID"=${historyModel.id}`);
        return record.rows[0] ? new History(record.rows[0]).get() : undefined;
    }

    async delete(id, userID) {
        const record = await db.update('History', `"Modifier"=${userID}, "ModifiTime"='${datetime()}', "IsDelete" = 1`, `"HistoryID"=${id}`);
        return record.rows[0] ? new History(record.rows[0]).get() : undefined;
    }
}

module.exports = HistoryRepository;