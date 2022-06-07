const Joi = require("@hapi/joi")
/**
 * Job Entity:
    id: required, string. must be a valid UUID (v4).
    type: required, string. must be one of 'ON_DEMAND', 'SHIFT' or 'SCHEDULED'.
    priceInPence: required, integer. can be zero, but cannot be negative.
    contactEmail: optional, string. must be a valid email if provided.
    status: required, string. must be one of 'AVAILABLE', 'ASSIGNED' or 'COMPLETED'.
    createdAt: required, string. must be a valid date in ISO 8601 format. automatically set when a Job entity is created.
    updatedAt: optional, string. must be a valid date in ISO 8601 format. defaults to null, automatically set whenever a Job entity is updated.
 */

const jobSchema = Joi.object({
   id: Joi.string()
      .guid()
      .required(),
   type: Joi.string()
      .pattern(new RegExp('ON_DEMAND|SHIFT|SCHEDULED'))
      .required(),
   priceInPence: Joi.number()
      .integer()
      .min(0)
      .required(),
   contactEmail: Joi.string()
      .email(),
   status: Joi.string()
      .pattern(new RegExp('AVAILABLE|ASSIGNED|COMPLETED')).required(),
   createdAt: Joi.date().iso().required(), // required, string.must be a valid date in ISO 8601 format.automatically set when a Job entity is created.
   updatedAt: Joi.date().iso(),  // optional, string.must be a valid date in ISO 8601 format.defaults to null, automatically set whenever a Job entity is updated.
});


const patchJobSchema = Joi.object({
   type: Joi.string()
      .pattern(new RegExp('ON_DEMAND|SHIFT|SCHEDULED')),
   priceInPence: Joi.number()
      .integer()
      .min(0),
   contactEmail: Joi.string()
      .email(),
   status: Joi.string()
      .pattern(new RegExp('AVAILABLE|ASSIGNED|COMPLETED')),
   createdAt: Joi.date().iso(), // required, string.must be a valid date in ISO 8601 format.automatically set when a Job entity is created.
   updatedAt: Joi.date().iso(),  // optional, string.must be a valid date in ISO 8601 format.defaults to null, automatically set whenever a Job entity is updated.
});

module.exports = { jobSchema, patchJobSchema };
