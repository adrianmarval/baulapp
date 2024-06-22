'use client';
import {registerUser} from '@/actions/user/register-user';
import {TextField, Button, Grid} from '@mui/material';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import toast from 'react-hot-toast';
import {userSchema} from '@/validations/userSchema';

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (user: z.infer<typeof userSchema>) => {
    try {
      const {success, message} = await registerUser(user);
      success ? toast.success(`Registro exitoso: ${message}`) : toast.error(`Error en el registro: ${message}`);
    } catch (error) {
      toast.error('Error inesperado');
    }
  };

  return (
    <Grid className='w-96 mx-auto h-screen flex justify-center items-center'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label='Nombre'
          type='text'
          {...register('firstName')}
          error={!!errors.email}
          helperText={errors.email?.message}
          fullWidth
          margin='dense'
        />
        <TextField
          label='Apellido'
          type='text'
          {...register('lastName')}
          error={!!errors.email}
          helperText={errors.email?.message}
          fullWidth
          margin='dense'
        />
        <TextField
          label='Email'
          type='email'
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
          fullWidth
          margin='dense'
        />
        <TextField
          label='Contraseña'
          type='password'
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
          fullWidth
          margin='dense'
        />
        <Button className='mt-4 w-full' type='submit' variant='contained'>
          Registrarse
        </Button>
      </form>
    </Grid>
  );
};

export default RegisterPage;
