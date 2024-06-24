import {useState} from 'react';
import {useSurveyStore} from '@/store/survey/survey-store';
import {addComment} from '@/actions/comments/add-comment';
import {toast} from 'react-hot-toast';
import {z} from 'zod';
import {commentSchema} from '@/validations/commentSchema';
import {addSurvey} from '@/actions/surveys/add-survey';
import {deleteComment} from '@/actions/comments/delete-comment';
import {editComment} from '@/actions/comments/edit-comment';
import {findSurveyByHostname} from '@/actions/surveys/find-survey';

export const useCommentHandler = () => {
  const {foundSurvey, setFoundSurvey, searchedSurvey, setComments} = useSurveyStore();

  const [isAddingComment, setIsAddingComment] = useState(false);
  const [isEditingComment, setIsEditingComment] = useState(false);
  const [isDeletingComment, setIsDeletingComment] = useState(false);

  const refreshComments = async () => {
    const {survey, error} = await findSurveyByHostname(searchedSurvey.host, searchedSurvey.router);
    if (error) {
      toast.error(error);
      setFoundSurvey(null);
      setComments([]);
    } else if (survey) {
      setFoundSurvey(survey);
      setComments(survey.comments);
    }
  };

  const handleAddComment = async (newComment: z.infer<typeof commentSchema>) => {
    setIsAddingComment(true);

    try {
      const surveyData = foundSurvey
        ? foundSurvey
        : await addSurvey({host: searchedSurvey.host, router: searchedSurvey.router}).then(({survey}) => survey);
      if (!surveyData) {
        throw new Error('No se pudo crear o encontrar la encuesta');
      }
      setFoundSurvey(surveyData);
      const {comment, error} = await addComment({...newComment, surveyId: surveyData._id.toString()});

      if (comment) {
        await refreshComments();
        toast.success('Comentario agregado');
      } else if (error) {
        toast.error(error);
      }
    } catch (error) {
      console.error(error);
      toast.error('Error al agregar el comentario');
    } finally {
      setIsAddingComment(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    setIsDeletingComment(true);
    try {
      const {success, error} = await deleteComment(commentId);
      if (success) {
        await refreshComments();
        toast.success('Comentario eliminado');
      } else {
        toast.error(error || 'Error al eliminar el comentario');
      }
    } catch (error) {
      toast.error('Error al eliminar el comentario');
    } finally {
      setIsDeletingComment(false);
    }
  };

  const handleEditComment = async (commentId: string, newText: string) => {
    setIsEditingComment(true);
    try {
      const {success, error} = await editComment(commentId, newText);
      if (success) {
        await refreshComments();
        toast.success('Comentario actualizado');
      } else {
        toast.error(error || 'Error al editar el comentario');
      }
    } catch (error) {
      toast.error('Error al editar el comentario');
    } finally {
      setIsEditingComment(false);
    }
  };

  return {handleAddComment, handleEditComment, handleDeleteComment, isAddingComment, isEditingComment, isDeletingComment};
};
