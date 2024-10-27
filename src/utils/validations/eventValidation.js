const Joi = require("joi");

const eventValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().min(10).required(),
    date: Joi.date().iso().required(),
    categories: Joi.array().items(Joi.string()).required(),
    location: Joi.string().required(),
    price: Joi.number().precision(2).required(),
  });
  return schema.validate(data);
};

module.exports = { eventValidation };
