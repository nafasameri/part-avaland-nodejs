class Resource {
    #ID;
    #Name;
    #Desc;
    #Icon;
    #Link;
    #Order;
    #Creator;
    #CreateTime;
    #Modifier;
    #ModifiTime;
    #IsDelete;

    constructor(resource) {
        this.#ID = resource.ResourceID;
        this.#Name = resource.ResourceName;
        this.#Desc = resource.ResourceDesc;
        this.#Icon = resource.ResourceIcon;
        this.#Link = resource.ResourceLink;
        this.#Order = resource.ResourceOrder;
        this.#Creator = resource.Creator;
        this.#CreateTime = resource.CreateTime;
        this.#Modifier = resource.Modifier;
        this.#ModifiTime = resource.ModifiTime;
        this.#IsDelete = resource.IsDelete;
    }

    get() {
        return {
            "resource-id": this.#ID,
            "name": this.#Name,
            "desc": this.#Desc,
            "icon": this.#Icon,
            "link": this.#Link,
            "order": this.#Order,
            "creator": this.#Creator,
            "create-time": this.#CreateTime,
            "midifier": this.#Modifier,
            "modifi-time": this.#ModifiTime,
            "delete?": this.#IsDelete
        };
    }
}

module.exports = Resource;