const Category = require("../models/category.model");
const db = require('../../../modules/database');
const datetime = require('../../../modules/utility').datetime;


class CategoryRepository {
    async fetchAll() {
        return db.selcet('Category', '*');
    }

    async fetchById(id) {
        return db.selcet('Category', '*', `"CategoryID"=${id}`);
    }

    async add(category, userID) {
        let roleModel = new Category(
            0,
            category.CategoryName,
            category.CategoryImg,
            userID,
            datetime(),
            userID,
            datetime(),
            0
        );
        const roleRow = db.insert('Category', '"CategoryName", "CategoryImg", "Creator", "CreateTime", "Modifier", "ModifiTime", "IsDelete"',
            `'${roleModel.CategoryName}', '${roleModel.CategoryImg}', ${roleModel.Creator}, '${roleModel.CreateTime}', ${roleModel.Modifier}, '${roleModel.ModifiTime}', ${roleModel.IsDelete}`);
        return roleRow;
    }

    async update(category, userID) {
        category.Modifier = userID;
        category.ModifiTime = datetime();

        return db.update('Category', `"CategoryName"='${category.CategoryName}', "CategoryImg"='${category.CategoryImg}', "Modifier"=${category.Modifier}, "ModifiTime"='${category.ModifiTime}'`, `"CategoryID"=${category.CategoryID}`);
    }

    async delete(id, userID) {
        return db.update('Category', `"Modifier"=${userID}, "ModifiTime"='${datetime()}', "IsDelete" = 1`, `"CategoryID"=${id}`);
    }
}

module.exports = CategoryRepository;