const CategorySchema = {
  Category: {
    type: "object",
    required: ["name"],
    properties: {
      name: {
        type: "string",
        description: "Name of the category",
        example: "Technology",
      },
    },
  },
};

module.exports = CategorySchema;
