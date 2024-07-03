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

module.exports.AwardSchema = Joi.object({
  newaward: Joi.object({
    date: Joi.number().required(),
    description: Joi.string().required(),
  }).required()

});

module.exports.ActivitieSchema = Joi.object({
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

module.exports.TrekkingSchema = Joi.object({
  newtrekking: Joi.object({
    year: Joi.number().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    type: Joi.string().required(),
    
  }).required()

});

module.exports.StudentSchema = Joi.object({
  newstudent: Joi.object({
   name:Joi.string().required(),
   university:Joi.string().required(),
   phd:Joi.string().required(),
   status:Joi.string().required(),
   bio:Joi.string(),
   link:Joi.string().required(),
   dept:Joi.string().required(),
   reg:Joi.string().required(),
   priority: Joi.number().required(),
    
  }).required()

});

module.exports.msfSchema = Joi.object({
  newMSF: Joi.object({
    name: Joi.string().required(),
    contact: Joi.string(),
    email: Joi.string().email(),
    institution: Joi.string().required(),
    meet: Joi.string(),
    degree: Joi.string(),
    dept: Joi.string(),
    org: Joi.string().required(),
    position: Joi.string().required(),
    area: Joi.string().required(),
    link: Joi.string().uri(),
    message: Joi.string(),
    priority: Joi.number().required(),
    view: Joi.boolean().required(),
  }).required()
});