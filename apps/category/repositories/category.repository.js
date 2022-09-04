const Category = require("../models/category.model");
const db = require('../../../modules/database');
const datetime = require('../../../modules/utility').datetime;


class CategoryRepository {
    async fetchAll() {
        const record = await db.selcet('Category', '*');
        return record.rows;
    }

    async fetchById(id) {
        const record = await db.selcet('Category', '*', `"CategoryID"=${id}`);
        return record.rows[0];
    }

    async add(category, userID) {
        let categoryModel = new Category(
            0,
            category.CategoryName ?? '',
            category.CategoryImg ?? '',
            userID,
            datetime(),
            userID,
            datetime(),
            0
        );
        const record = await db.insert('Category', '"CategoryName", "CategoryImg", "Creator", "CreateTime", "Modifier", "ModifiTime", "IsDelete"',
            `'${categoryModel.CategoryName}', '${categoryModel.CategoryImg}', ${categoryModel.Creator}, '${categoryModel.CreateTime}', ${categoryModel.Modifier}, '${categoryModel.ModifiTime}', ${categoryModel.IsDelete}`);
        return record.rows[0];
    }

    async update(category, userID) {
        category.Modifier = userID;
        category.ModifiTime = datetime();

        const record = await db.update('Category', `"CategoryName"='${category.CategoryName}', "CategoryImg"='${category.CategoryImg}', "Modifier"=${category.Modifier}, "ModifiTime"='${category.ModifiTime}'`, `"CategoryID"=${category.CategoryID}`);
        return record.rows[0];
    }

    async delete(id, userID) {
        const record = await db.update('Category', `"Modifier"=${userID}, "ModifiTime"='${datetime()}', "IsDelete" = 1`, `"CategoryID"=${id}`);
        return record.rows[0];
    }
}

module.exports = CategoryRepository;