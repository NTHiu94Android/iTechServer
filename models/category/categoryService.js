const category_model = require('../category/categoryModel');
const brand_model = require('../brand/brandModel');
const brand_service = require('../brand/brandService');

//Lay category theo id
const get_category_by_id = async (_id) => {
    const category = await category_model.findOne({ _id: _id });
    return category;
};

//Lay tat ca category
const get_all_category = async () => {
    const categories = await category_model.find({});
    return categories;
};

//Cap nhat category theo id
const update_category = async (_id, name, image) => {
    const category = await category_model.findOneAndUpdate({ _id: _id }, { name: name, image: image });
    return category;
};

//Xoa category theo id
const delete_category = async (_id) => {
    const category = await category_model.findById({ _id: _id });
    const brands = await brand_model.find({ idCategory: _id });
    if (brands) {
        for (let i = 0; i < brands.length; i++) {
            await brand_service.delete_brand(brands[i]._id);
        }
    }
    //Neu xoa thanh cong thi tra ve true
    if (category) {
        return true;
    }
    return false;
};

//Them category
const add_category = async (name, image) => {
    const category = new category_model({
        name: name,
        image: image
    });
    await category.save();
    return category;
};

module.exports = { get_all_category, add_category, update_category, delete_category, get_category_by_id };
