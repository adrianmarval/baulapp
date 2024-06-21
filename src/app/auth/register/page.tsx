'use client';
import {registerUser} from '@/actions/user/register-user';
import {TextField, Button} from '@mui/material';
import {zodResolver} from '@hookform/resolvers/zod';

import {useForm} from 'react-hook-form';
import {z} from 'zod';
import toast from 'react-hot-toast';
import {useRouter} from 'next/navigation';

// Esquema de validación con Zod
const schema = z.object({
  email: z.string().email('Debe ser un correo electrónico válido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
});

const page = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    // Corrección aquí
    try {
      // Lógica de registro en el servidor (interacción con base de datos, etc.)
      const response = await registerUser(data.email, data.password); // Llama a tu función de registro

      if (response.success) {
        // Redirige al usuario tras un registro exitoso
        router.push('/api/auth/signin');
        toast.success(`Registro exitoso: ${response.message}`);
      } else {
        // Maneja errores del servidor (muestra mensajes al usuario, etc.)
        toast.error(`Error en el registro: ${response.message}`);
      }
    } catch (error) {
      // Maneja errores inesperados
      console.error('Error inesperado:', error);
      toast.error('Error inesperado');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label='Email'
        type='email'
        {...register('email')}
        error={!!errors.email}
        helperText={errors.email?.message}
        fullWidth
        margin='normal'
      />
      <TextField
        label='Contraseña'
        type='password'
        {...register('password')}
        error={!!errors.password}
        helperText={errors.password?.message}
        fullWidth
        margin='normal'
      />

      <Button type='submit' variant='contained'>
        Registrarse
      </Button>
    </form>
  );
};

export default page;
