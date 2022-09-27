const Category = require("../models/category.model");
const db = require('../../../modules/database');
const datetime = require('../../../modules/utility').datetime;


class CategoryRepository {
    async fetchAll() {
        const record = await db.selcet('Category', '*');
        const categories = [];
        record.rows.forEach((row) => {
            const category = new Category(row);
            categories.push(category.get());
        });
        return categories;
    }

    async fetchById(id) {
        const record = await db.selcet('Category', '*', `"CategoryID"=${id}`);
        const category = new Category(record.rows[0]);
        return category.get();
    }

    async add(category, userID) {
        const categoryModel = {
            name: category.name ?? '',
            img: category.img ?? '',
            Creator: userID,
            CreateTime: datetime(),
            Modifier: userID,
            ModifiTime: datetime(),
            IsDelete: 0
        };
        const record = await db.insert('Category', '"CategoryName", "CategoryImg", "Creator", "CreateTime", "Modifier", "ModifiTime", "IsDelete"',
            `'${categoryModel.name}', '${categoryModel.img}', ${categoryModel.Creator}, '${categoryModel.CreateTime}', ${categoryModel.Modifier}, '${categoryModel.ModifiTime}', ${categoryModel.IsDelete}`);
        return new Category(record.rows[0]).get();
    }

    async update(category, userID) {
        const categoryModel = {
            id: category["category-id"] ?? '',
            name: category.name ?? '',
            img: category.img ?? '',
            Creator: category["creator"],
            CreateTime: category["create-time"],
            Modifier: userID,
            ModifiTime: datetime(),
            IsDelete: category["delete?"]
        };

        const record = await db.update('Category', `"CategoryName"='${categoryModel.name}', "CategoryImg"='${categoryModel.img}', "Modifier"=${categoryModel.Modifier}, "ModifiTime"='${categoryModel.ModifiTime}'`, `"CategoryID"=${categoryModel.id}`);
        return new Category(record.rows[0]).get();
    }

    async delete(id, userID) {
        const record = await db.update('Category', `"Modifier"=${userID}, "ModifiTime"='${datetime()}', "IsDelete" = 1`, `"CategoryID"=${id}`);
        return new Category(record.rows[0]).get();
    }
}

module.exports = CategoryRepository;