import {z} from 'zod';

export const commentSchema = z.object({
  text: z
    .string()
    .min(3, 'El comentario debe tener al menos 3 caracteres')
    .max(1000, 'El comentario no debe exceder los 1000 caracteres')
    .regex(/^[^<>{}]*$/, 'El comentario no debe contener código de programación'),
  userId: z.string(),
  surveyId: z.string(),
  router: z.string().optional(),
});
