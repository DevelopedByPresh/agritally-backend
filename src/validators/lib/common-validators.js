import Joi from 'joi';

import { objectIdSchema } from './common-schema.js';

export const idValidator = Joi.object({
  params: Joi.object({
    id: objectIdSchema.required(),
  }),
});
