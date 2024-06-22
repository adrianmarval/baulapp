import {z} from 'zod';
import validator from 'validator';

// Función para validar que un string sea un hostname válido utilizando validator
const isValidHostname = (value: string): boolean => {
  return validator.isFQDN(value);
};

// Función para validar que un string sea una URL válida utilizando validator
const isValidUrl = (value: string): boolean => {
  return validator.isURL(value);
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
    .min(1)
    .refine((value) => isValidUrl(value), {
      message: 'El campo url debe ser una URL válida',
    }),
  comments: z.array(z.string()),
});
