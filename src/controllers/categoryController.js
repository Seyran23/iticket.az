const Category = require("../models/Category");

exports.getAllCategories = async (req, res) => {
try {
  const categories = await Category.find();
  res.status(200).json(categories);
} catch (error) {
  res.status(500).json({ message: error.message });
}
};

exports.getCategoryById = async (req, res) => {
try {
  const {id} = req.params
  const category = await Category.findById(id);
  
  if (!category) {
    return res.status(400).json({ message: "Category with this id doesnt exist" });
  }
  
    res.status(200).json(category);
} catch (error) {
  res.status(500).json({ message: error.message });
}
};

exports.createCategory = async (req, res) => {
const { name } = req.body;
try {
  const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: "Category with this name already exists." });

    }
    
  const category = new Category({ name });
  await category.save();
  res.status(201).json(category);
} catch (error) {
  res.status(500).json({ message: error.message });
}
};

exports.updateCategory = async (req, res) => {
const { id } = req.params;
const { name } = req.body;

try {
  const category = await Category.findById(id);
  if (!category)
    return res.status(404).json({ message: "Category not found" });

  category.name = name;
  await category.save();

  res.status(200).json(category);
} catch (error) {
  res.status(500).json({ message: error.message });
}
};

exports.deleteCategory = async (req, res) => {
const { id } = req.params;

try {
  const category = await Category.findById(id);
  if (!category)
    return res.status(404).json({ message: "Category not found" });

  await category.deleteOne();
  res.status(200).json({ message: "Category deleted" });
} catch (error) {
  res.status(500).json({ message: error.message });
}
};
