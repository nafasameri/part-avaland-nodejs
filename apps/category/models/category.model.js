class Category {
    CategoryID;
    CategoryName;
    CategoryImg;
    Creator;
    CreateTime;
    Modifier;
    ModifiTime;
    IsDelete;

    constructor(CategoryID, CategoryName, CategoryImg, Creator, CreateTime, Modifier, ModifiTime, IsDelete) {
        this.CategoryID = CategoryID;
        this.CategoryName = CategoryName;
        this.CategoryImg = CategoryImg;
        this.Creator = Creator;
        this.CreateTime = CreateTime;
        this.Modifier = Modifier;
        this.ModifiTime = ModifiTime;
        this.IsDelete = IsDelete;
    }
}

module.exports = Category;