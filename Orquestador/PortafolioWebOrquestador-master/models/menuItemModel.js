// Model for the JSON of the menu item

class MenuItem {
    constructor(name, description, price, isAvailable, categoryId, imageId) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.isAvailable = isAvailable;
        this.categoryId = categoryId;
        this.imageId = imageId;
    }
}

module.exports = MenuItem;