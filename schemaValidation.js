const Joi = require('joi');

module.exports.PublicationSchema = Joi.object({
  newpublication: Joi.object({
    author: Joi.string().required(),
    title: Joi.string().required(),
    location: Joi.string().required(),
    description: Joi.string(),
    date: Joi.string().required(),
    type: Joi.string().required(),
    link: Joi.string(),
  }).required()

});

module.exports.AwardSchema= Joi.object({
  newaward: Joi.object({
     date: Joi.string().required(),
     description: Joi.string().required(),
  }).required()

});