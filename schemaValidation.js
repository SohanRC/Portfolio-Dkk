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
    year: Joi.number().required(),
    priority: Joi.number().required(),
  }).required()

});

module.exports.AwardSchema= Joi.object({
  newaward: Joi.object({
     date: Joi.number().required(),
     description: Joi.string().required(),
  }).required()

});

module.exports.ActivitieSchema= Joi.object({
  newactivitie: Joi.object({
     program: Joi.string().required(),
     acted_as: Joi.string(),
     organizer: Joi.string().required(),
     date: Joi.string().required(),
     year: Joi.number().required(),
     priority: Joi.number().required(),
     type: Joi.string().required(),
  }).required()

});