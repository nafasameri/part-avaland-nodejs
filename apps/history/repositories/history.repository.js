const History = require("../models/history.model");
const db = require('../../../modules/database');
const datetime = require('../../../modules/utility').datetime;


class HistoryRepository {
    async fetchAll() {
        const record = await db.selcet('History', '*');
        return record.rows;
    }

    async fetchById(id) {
        const record = await db.selcet('History', '*', `"HistoryID"=${id}`);
        return record.rows[0];
    }

    async add(history, userID) {
        let historyModel = new History(
            0,
            history.UserID ?? null,
            history.MusicID ?? null,
            userID,
            datetime(),
            userID,
            datetime(),
            0
        );
        const record = await db.insert('History', '"UserID", "MusicID", "Creator", "CreateTime", "Modifier", "ModifiTime", "IsDelete"',
            `'${historyModel.UserID}', '${historyModel.MusicID}', ${historyModel.Creator}, '${historyModel.CreateTime}', ${historyModel.Modifier}, '${historyModel.ModifiTime}', ${historyModel.IsDelete}`);
        return record.rows[0];
    }

    async update(history, userID) {
        history.Modifier = userID;
        history.ModifiTime = datetime();

        const record = await db.update('History', `"HistoryName"='${history.UserID}', "HistoryImg"='${history.MusicID}', "Modifier"=${history.Modifier}, "ModifiTime"='${history.ModifiTime}'`, `"HistoryID"=${history.HistoryID}`);
        return record.rows[0];
    }

    async delete(id, userID) {
        const record = await db.update('History', `"Modifier"=${userID}, "ModifiTime"='${datetime()}', "IsDelete" = 1`, `"HistoryID"=${id}`);
        return record.rows[0];
    }
}

module.exports = HistoryRepository;