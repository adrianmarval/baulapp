'use client';

import {commentSchema} from '@/validations/commentSchema';
import {TextField, Button, CircularProgress} from '@mui/material';
import {Types} from 'mongoose';
import toast from 'react-hot-toast';
import {SurveyInterface} from '@/interfaces/survey';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {Session} from 'next-auth';
import {useCommentHandler} from '@/hooks/useCommentHandler';

interface Props {
  session: Session;
  foundSurvey: SurveyInterface | null;
}

export const CommentBox = ({session, foundSurvey}: Props) => {
  const {handleAddComment, isAddingComment} = useCommentHandler();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: {errors},
  } = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      text: '',
      userId: session.user.id.toString(),
      surveyId: foundSurvey ? foundSurvey._id.toString() : new Types.ObjectId().toString(),
    },
  });

  const onSubmit = async (data: z.infer<typeof commentSchema>) => {
    setValue('surveyId', foundSurvey ? foundSurvey._id.toString() : new Types.ObjectId().toString());
    setValue('userId', session.user.id);

    const result = commentSchema.safeParse(data);

    if (!result.success) {
      let errorMessage = '';
      result.error.issues.forEach(
        (issue) => (errorMessage = `${errorMessage} ${issue.path[0].toString().toUpperCase()}: ${issue.message}.\n`)
      );
      toast.error(errorMessage);
      return;
    }

    try {
      await handleAddComment(result.data);
      reset();
    } catch (error) {
      toast.error('Error al agregar el comentario');
    }
  };

  const onError = (errors: any) => {
    console.log('Errors:', errors);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(onSubmit, onError)();
    } else if (event.key === 'Enter' && event.shiftKey) {
      event.preventDefault();
      const textarea = event.target as HTMLInputElement;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      if (start !== null && end !== null) {
        const newValue = textarea.value.substring(0, start) + '\n' + textarea.value.substring(end);
        textarea.value = newValue;
        textarea.selectionStart = textarea.selectionEnd = start + 1;
        setValue('text', newValue);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <div className='flex flex-col gap-1'>
        <TextField
          className='w-[600px] mt-5'
          id='outlined-multiline-static'
          label='Agregar comentario'
          multiline
          rows={4}
          {...register('text')}
          error={!!errors.text}
          helperText={errors.text ? errors.text.message : ''}
          disabled={isAddingComment}
          onKeyDown={handleKeyDown}
        />
        <TextField {...register('userId')} sx={{display: 'none'}} />
        <TextField {...register('surveyId')} sx={{display: 'none'}} />
        <Button sx={{height: 80}} variant='text' color='primary' type='submit' disabled={isAddingComment}>
          {isAddingComment ? <CircularProgress size={24} /> : 'Comentar'}
        </Button>
      </div>
    </form>
  );
};
