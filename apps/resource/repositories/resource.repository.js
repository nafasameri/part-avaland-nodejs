const Resource = require("../models/resource.model");
const db = require('../../../modules/database');
const datetime = require('../../../modules/utility').datetime;


class ResourceRepository {
    async fetchAll() {
        const record = await db.selcet('Resource', '*');
        const resources = [];
        record.rows.forEach((row) => {
            resources.push(new Resource(row).get());
        });
        return resources;
    }

    async fetchById(id) {
        const record = await db.selcet('Resource', '*', `"ResourceID"=${id}`);
        return record.rows[0] ? new Resource(record.rows[0]).get() : undefined;
    }

    async add(resource, userID) {
        const resourceModel = {
            ResourceName: resource.name ?? '',
            ResourceDesc: resource.desc ?? '',
            ResourceIcon: resource.icon ?? '',
            ResourceLink: resource.link ?? '',
            ResourceOrder: resource.order ?? 0,
            Creator: userID ?? null,
            CreateTime: datetime(),
            Modifier: userID ?? null,
            ModifiTime: datetime(),
            IsDelete: 0
        };
        const record = await db.insert('Resource', '"ResourceName", "ResourceDesc", "ResourceIcon", "ResourceLink", "ResourceOrder", "IsResource", "Creator", "CreateTime", "Modifier", "ModifiTime", "IsDelete"',
            `'${resourceModel.ResourceName}', '${resourceModel.ResourceDesc}', '${resourceModel.ResourceIcon}', '${resourceModel.ResourceLink}', ${resourceModel.ResourceOrder}, ${resourceModel.IsResource}, ${resourceModel.Creator}, '${resourceModel.CreateTime}', ${resourceModel.Modifier}, '${resourceModel.ModifiTime}', ${resourceModel.IsDelete}`);
        return record.rows[0] ? new Resource(record.rows[0]).get() : undefined;
    }

    async update(resource, userID) {
        const resourceModel = {
            ResourceID: resource["resource-id"] ?? null,
            ResourceName: resource.name ?? '',
            ResourceDesc: resource.desc ?? '',
            ResourceIcon: resource.icon ?? '',
            ResourceLink: resource.link ?? '',
            ResourceOrder: resource.order ?? 0,
            Modifier: userID ?? null,
            ModifiTime: datetime(),
        };

        const record = await db.update('Resource', `"ResourceName"='${resourceModel.ResourceName}', "ResourceDesc"='${resourceModel.ResourceDesc}', "ResourceLink"='${resourceModel.ResourceLink}', "ResourceIcon"='${resourceModel.ResourceIcon}', "ResourceOrder"=${resourceModel.ResourceOrder}, "IsResource"=${resourceModel.IsResource}, "Modifier"=${resourceModel.Modifier}, "ModifiTime"='${resourceModel.ModifiTime}'`,
            `"ResourceID"=${resourceModel.ResourceID}`);
        return record.rows[0] ? new Resource(record.rows[0]).get() : undefined;
    }

    async delete(id, userID) {
        const record = await db.update('Resource', `"Modifier"=${userID}, "ModifiTime"='${datetime()}', "IsDelete" = 1`, `"ResourceID"=${id}`);
        return record.rows[0] ? new Resource(record.rows[0]).get() : undefined;
    }
}

module.exports = ResourceRepository;