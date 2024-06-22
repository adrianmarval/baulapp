import {z} from 'zod';

export const userSchema = z.object({
  firstName: z.string().min(1, 'El nombre es obligatorio').max(50, 'El nombre no puede tener más de 50 caracteres'),
  lastName: z.string().min(1, 'El apellido es obligatorio').max(50, 'El apellido no puede tener más de 50 caracteres'),
  email: z.string().email('Debe ser un correo electrónico válido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
});
