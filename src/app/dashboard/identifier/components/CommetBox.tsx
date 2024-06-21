'use client';

import {commentSchema} from '@/validations/commentSchema';
import {TextField, Button} from '@mui/material';
import toast from 'react-hot-toast';

export const CommetBox = () => {
  const handleSubmitComment = (formData: FormData) => {
    const newComment = {
      text: formData.get('text'),
      userId: crypto.randomUUID(),
      survey: crypto.randomUUID(),
    };

    const result = commentSchema.safeParse(newComment);

    if (!result.success) {
      let errorMessage = '';

      result.error.issues.forEach(
        (issue) => (errorMessage = `${errorMessage} ${issue.path[0].toString().toUpperCase()}: ${issue.message}.\n`)
      );

      toast.error(errorMessage);
      return;
    }

    console.log(newComment);
  };

  return (
    <form action={handleSubmitComment}>
      <div className='flex flex-col gap-1'>
        <TextField
          className='w-[600px] mt-5'
          id='outlined-multiline-static'
          name='text'
          label='Agregar comentario'
          multiline
          rows={4}
        />
        <Button sx={{height: 80}} variant='text' color='primary' type='submit'>
          Comentar
        </Button>
      </div>
    </form>
  );
};
