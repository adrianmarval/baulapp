import {z} from 'zod';

export const commentSchema = z.object({
  text: z.string().min(1, 'El comentario no puede estar vacío'),
  userId: z.string().min(1, 'El ID de usuario es requerido'),
  surveyId: z.string().min(1, 'El ID de la encuesta es requerido'),
});
