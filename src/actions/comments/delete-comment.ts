'use server';

import {connectDb} from '@/libs/mongodb';
import Comment from '@/models/comment';
import Survey from '@/models/survey';

interface DeleteCommentResponse {
  success: boolean;
  error?: string;
}

export const deleteComment = async (commentId: string): Promise<DeleteCommentResponse> => {
  try {
    await connectDb();

    const deletedComment = await Comment.findByIdAndDelete(commentId);

    if (!deletedComment) {
      return {success: false, error: 'Comentario no encontrado'};
    }

    // Eliminar la referencia del comentario en la encuesta
    await Survey.updateMany({comments: commentId}, {$pull: {comments: commentId}});

    return {success: true};
  } catch (error) {
    console.error('Error al eliminar el comentario:', error);
    return {success: false, error: 'Error al eliminar el comentario'};
  }
};
