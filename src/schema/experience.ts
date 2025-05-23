import { Experience } from '@/types';
import Joi from 'joi';

const experienceSchema = Joi.object({
  company_name: Joi.string().required(),
  position: Joi.string().required(),
  start_date: Joi.date().min(new Date('1-1-1900')).max(new Date()).required(),
  end_date: Joi.date()
    .optional()
    .allow(null)
    .greater(Joi.ref('start_date'))
    .max(new Date()),
  description: Joi.array().items(Joi.string()),
  mode: Joi.string().valid('onsite', 'remote').required(),
  location: Joi.string().allow(null).allow(''),
  id: Joi.string().optional(),
  _id: Joi.string().optional(),
  user: Joi.string().optional()
});

const validateExperience = (data: Experience) => {
  return experienceSchema.validate(data, { abortEarly: false });
};

export default validateExperience;
