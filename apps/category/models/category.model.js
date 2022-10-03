class Category {
    #ID;
    #Name;
    #Img;
    #Creator;
    #CreateTime;
    #Modifier;
    #ModifiTime;
    #IsDelete;

    constructor(category) {
        console.log(category);
        this.#ID = category.CategoryID;
        this.#Name = category.CategoryName;
        this.#Img = category.CategoryImg;
        this.#Creator = category.Creator;
        this.#CreateTime = category.CreateTime;
        this.#Modifier = category.Modifier;
        this.#ModifiTime = category.ModifiTime;
        this.#IsDelete = category.IsDelete;
    }

    get() {
        return {
            "category-id": this.#ID,
            "name": this.#Name,
            "img": this.#Img,
            "creator": this.#Creator,
            "create-time": this.#CreateTime,
            "midifier": this.#Modifier,
            "modifi-time": this.#ModifiTime,
            "delete?": this.#IsDelete,
        };
    }
}

module.exports = Category;