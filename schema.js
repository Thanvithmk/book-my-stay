//schema for listing

const Joi=require('joi');

const listingSchema=Joi.object({
    listing:Joi.object().required({
        title:Joi.string().required(),
        description:Joi.string().required(),
        price:Joi.number().required().min(0),
        image:Joi.string().allow(''),
        location:Joi.string().required(),
        country:Joi.string().required()
        })
})

//schema for review
const reviewSchema=Joi.object({
    review:Joi.object().required({
        rating:Joi.number().required().min(1).max(5),
        comment:Joi.string().required()
    }).required()
})

module.exports={listingSchema,reviewSchema};