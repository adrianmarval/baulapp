'use server';

import {connectDb} from '@/libs/mongodb';
import Comment from '@/models/comment';

interface EditCommentResponse {
  success: boolean;
  error?: string;
}

export const editComment = async (commentId: string, newText: string): Promise<EditCommentResponse> => {
  try {
    await connectDb();

    const updatedComment = await Comment.findByIdAndUpdate(commentId, {text: newText}, {new: true, runValidators: true});

    if (!updatedComment) {
      return {success: false, error: 'Comentario no encontrado'};
    }

    return {success: true};
  } catch (error) {
    console.error('Error al editar el comentario:', error);
    return {success: false, error: 'Error al editar el comentario'};
  }
};
