const Joi = require('joi');

module.exports.PublicationSchema = Joi.object({
  newpublication: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    date: Joi.string().required(),
    type: Joi.string().required(),
  }).required()

});

// module.exports.reviewSchema= Joi.object({
//   review: Joi.object({
//      comment: Joi.string().required(),
//      rating: Joi.number().required().min(1).max(5),
//   }).required()

// });