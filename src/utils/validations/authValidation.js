const Joi = require("joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().min(6).email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid("admin", "user")
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).email().required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

const updateProfileValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3),
    email: Joi.string().min(6).email(),
    currentPassword: Joi.string().min(6),
    newPassword: Joi.string().min(6),
  });
  return schema.validate(data);
};

module.exports = { registerValidation, loginValidation, updateProfileValidation };
