const SliderSchema = {
  Slider: {
    type: "object",
    required: ["imageUrl", "title"],
    properties: {
      imageUrl: {
        type: "string",
        description: "URL of the image displayed in the slider",
        example: "https://example.com/image.jpg",
      },
      title: {
        type: "string",
        description: "Title displayed in the slider",
        example: "Welcome to Our Site",
      },
      description: {
        type: "string",
        description: "Description for the slider item",
        example: "This is a brief description of the slider item.",
      },
      isActive: {
        type: "boolean",
        description: "Indicates if the slider item is active",
        example: true,
      },
    },
  },
};

module.exports = SliderSchema;
