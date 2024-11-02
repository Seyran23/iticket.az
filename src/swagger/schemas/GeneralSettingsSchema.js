const GeneralSettingsSchema = {
  GeneralSettings: {
    type: "object",
    required: ["logo", "siteName", "aboutUs", "contactDetails"],
    properties: {
      logo: {
        type: "string",
        description: "URL of the website logo",
        example: "https://example.com/logo.png",
      },
      siteName: {
        type: "string",
        description: "Name of the website",
        example: "My Website",
      },
      aboutUs: {
        type: "string",
        description: "Brief information about the website",
        example: "We are dedicated to providing excellent services.",
      },
      contactDetails: {
        type: "object",
        properties: {
          email: {
            type: "string",
            description: "Contact email address",
            example: "contact@example.com",
          },
          phone: {
            type: "string",
            description: "Contact phone number",
            example: "+1234567890",
          },
          address: {
            type: "string",
            description: "Physical address of the website or company",
            example: "123 Main St, City, Country",
          },
        },
      },
    },
  },
};

module.exports = GeneralSettingsSchema;
