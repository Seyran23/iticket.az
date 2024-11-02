const Joi = require("joi");

const createEventValidation = (data) => {
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

const updateEventValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3),
    description: Joi.string().min(10),
    date: Joi.date().iso(),
    categories: Joi.array().items(Joi.string()),
    location: Joi.string(),
    price: Joi.number().precision(2),
  });
  return schema.validate(data);
};

module.exports = { createEventValidation, updateEventValidation };
