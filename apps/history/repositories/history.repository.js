const History = require("../models/history.model");
const db = require('../../../modules/database');
const datetime = require('../../../modules/utility').datetime;


class HistoryRepository {
    async fetchAll() {
        return db.selcet('History', '*');
    }

    async fetchById(id) {
        return db.selcet('History', '*', `"HistoryID"=${id}`);
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
        const historyRow = db.insert('History', '"UserID", "MusicID", "Creator", "CreateTime", "Modifier", "ModifiTime", "IsDelete"',
            `'${historyModel.UserID}', '${historyModel.MusicID}', ${historyModel.Creator}, '${historyModel.CreateTime}', ${historyModel.Modifier}, '${historyModel.ModifiTime}', ${historyModel.IsDelete}`);
        return historyRow;
    }

    async update(history, userID) {
        history.Modifier = userID;
        history.ModifiTime = datetime();

        return db.update('History', `"HistoryName"='${history.UserID}', "HistoryImg"='${history.MusicID}', "Modifier"=${history.Modifier}, "ModifiTime"='${history.ModifiTime}'`, `"HistoryID"=${history.HistoryID}`);
    }

    async delete(id, userID) {
        return db.update('History', `"Modifier"=${userID}, "ModifiTime"='${datetime()}', "IsDelete" = 1`, `"HistoryID"=${id}`);
    }
}

module.exports = HistoryRepository;