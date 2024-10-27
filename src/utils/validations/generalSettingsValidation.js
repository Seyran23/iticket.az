const Joi = require("joi");

const generalSettingsValidation = (data) => {
  const schema = Joi.object({
    logo: Joi.string().uri().required(),
    sitename: Joi.string().required(),
    aboutUs: Joi.string().required(),
    contactDetails: Joi.object({
      phone: Joi.string().required(),
      email: Joi.string().email().required(),
      address: Joi.string().required(),
    }).required(),
  });
  return schema.validate(data);
};

module.exports = { generalSettingsValidation };
