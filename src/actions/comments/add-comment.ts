'use server';

import {connectDb} from '@/libs/mongodb';
import {z} from 'zod';
import Comment from '@/models/comment';
import Survey from '@/models/survey';
import {commentSchema} from '@/validations/commentSchema';
import {CommentResponse} from '@/interfaces/comment';
import User from '@/models/user';

interface AddCommentResponse {
  comment?: CommentResponse;
  error?: string;
}

export const addComment = async (comment: z.infer<typeof commentSchema>): Promise<AddCommentResponse> => {
  try {
    await connectDb();

    // Crear y guardar el nuevo comentario
    const newComment = new Comment(comment);
    await newComment.save();

    // Agregar el ID del comentario a la encuesta correspondiente
    await Survey.findByIdAndUpdate(comment.surveyId, {$push: {comments: newComment._id}}, {new: true});

    const user = await User.findById(comment.userId);

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    return {
      comment: {
        _id: newComment._id.toString(),
        text: newComment.text,
        date: newComment.updatedAt.toString(),
        user: `${user.firstName} ${user.lastName}`,
        userId: newComment.userId.toString(),
      },
    };
  } catch (error) {
    console.log(error);
    return {error: 'No se pudo agregar el comentario'};
  }
};
