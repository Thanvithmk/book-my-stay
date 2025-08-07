//schema for listing

const Joi=require('joi');

const listingSchema=Joi.object({
    listing:Joi.object().required({
        title:Joi.string().required(),
        description:Joi.string().required(),
        price:Joi.number().required().min(0),
        image:Joi.string().allow(''),
        city:Joi.string().required(),
        country:Joi.string().required()
        })
})

module.exports=listingSchema;