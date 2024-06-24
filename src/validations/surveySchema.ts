import {z} from 'zod';
import validator from 'validator';

const isValidHostname = (value: string): boolean => {
  return validator.isFQDN(value);
};

const isValidUrl = (value: string | undefined): boolean => {
  return !value || validator.isURL(value);
};

export const surveySchema = z.object({
  host: z
    .string()
    .min(1)
    .refine((value) => isValidHostname(value), {
      message: 'El campo host debe ser un hostname válido',
    }),
  url: z
    .string()
    .optional()
    .refine((value) => isValidUrl(value), {
      message: 'El campo url debe ser una URL válida',
    }),
  router: z.string().min(1, 'El campo router es requerido'),
});
