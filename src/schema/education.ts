import { Education } from '@/types';
import Joi from 'joi';

export const educationSchema = Joi.object({
  level: Joi.string()
    .valid(
      'lower_secondary',
      'senior_secondary',
      'diploma',
      'graduation',
      'post_graduation'
    )
    .required(),
  institute_name: Joi.string().required(),
  start_year: Joi.number().min(1900).max(new Date().getFullYear()),
  end_year: Joi.number()
    .min(1900)
    .max(new Date().getFullYear() + 10)
    .greater(Joi.ref('start_year'))
    .required(),
  score: Joi.number().min(0).max(100).required(),
  specialisation: Joi.string().optional().allow(''),
  maximum_score: Joi.number().required(),
  scoring_type: Joi.string().required(),
  degree: Joi.string().optional().allow(''),
  id: Joi.string().optional(),
  _id: Joi.string().optional(),
  user_id: Joi.string().optional()
});

const validateEducation = (data: Education) => {
  return educationSchema.validate(data, { abortEarly: false });
};

export default validateEducation;
