const Joi = require('joi');

const orderTicketValidation = (data) => {
    const schema = Joi.object({
        eventId: Joi.string().required(),
        quantity: Joi.number().min(1).required(),
        totalPrice: Joi.number().precision(2).required(),
    });
    return schema.validate(data);
};

module.exports = { orderTicketValidation };

