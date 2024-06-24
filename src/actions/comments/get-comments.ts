'use server';

import {connectDb} from '@/libs/mongodb';
import Comment from '@/models/comment';
import {CommentResponse} from '@/interfaces/comment';
import {format, formatDistanceToNow} from 'date-fns';
import {es} from 'date-fns/locale';
import {capitalizeFullName} from '@/libs/utils';

export const getComments = async (surveyId: string): Promise<CommentResponse[]> => {
  try {
    await connectDb();

    // Encuentra los comentarios y popula el campo user con los datos del usuario
    const comments = await Comment.find({survey: surveyId}).populate('user');

    // Mapea los comentarios para incluir el username construido
    const commentsResponse: CommentResponse[] = comments.map((comment) => {
      const formattedDate = format(comment.createdAt, 'dd/MM/yyyy HH:mm:ss'); // Formato de fecha
      const relativeDate = formatDistanceToNow(comment.createdAt, {addSuffix: true, locale: es}); // Fecha relativa

      return {
        _id: comment._id.toString(),
        text: comment.text,
        user: capitalizeFullName(`${comment.userId.firstName} ${comment.userId.lastName}`),
        date: `${formattedDate} (${relativeDate})`,
        userId: comment.userId.toString(),
      };
    });

    return commentsResponse;
  } catch (error) {
    console.log(error);
    return [];
  }
};
