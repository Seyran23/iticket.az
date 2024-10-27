const Joi = require('joi');

const sliderValidation = (data) => {
    const schema = Joi.object({
        imageUrl: Joi.string().required(),
        title: Joi.number().min(1).required(),
        description: Joi.number().precision(2).required(),
        isActive: Joi.boolean()
    });
    return schema.validate(data);
};

module.exports = { sliderValidation };

