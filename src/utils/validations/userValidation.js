const Joi = require("joi");

const updateUserValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3),
    email: Joi.string().min(6).email(),
    password: Joi.string().min(6),
    role: Joi.string().valid("admin", "user")
  });
  return schema.validate(data);
};


module.exports = updateUserValidation
