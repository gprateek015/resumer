import { Project } from '@/types';
import Joi from 'joi';

const projectSchema = Joi.object({
  name: Joi.string().required(),
  skills_required: Joi.array().items(Joi.string()),
  description: Joi.array().items(Joi.string()),
  code_url: Joi.string().allow(''),
  live_url: Joi.string().allow(''),
  video_url: Joi.string().allow(''),
  id: Joi.string().optional(),
  _id: Joi.string().optional(),
  user_id: Joi.string().optional()
});

const validateProject = (data: Project) => {
  return projectSchema.validate(data, { abortEarly: false });
};

export default validateProject;
