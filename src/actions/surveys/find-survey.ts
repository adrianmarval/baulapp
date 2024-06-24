'use server';

import {connectDb} from '@/libs/mongodb';
import Survey from '@/models/survey';
import {format, formatDistanceToNow} from 'date-fns';
import {es} from 'date-fns/locale';
import {SurveyInterface} from '@/interfaces/survey';
import '@/models/comment';
import '@/models/user';
import {capitalizeFullName} from '@/libs/utils';

interface FindSurveyByIdResponse {
  survey?: SurveyInterface;
  error?: string;
}

export const findSurveyByHostname = async (host: string, router: string): Promise<FindSurveyByIdResponse> => {
  try {
    await connectDb();

    const survey = await Survey.findOne({host, router}).populate({
      path: 'comments',
      populate: {
        path: 'userId',
        model: 'User',
        select: 'firstName lastName',
      },
    });

    if (!survey) {
      return {
        error: 'Survey not found',
      };
    }

    const commentsArray = Array.isArray(survey.comments) ? survey.comments : [survey.comments];

    const surveyFound = {
      _id: survey._id.toString(),
      host: survey.host,
      url: survey.url,
      router: survey.router,
      comments: commentsArray.map((comment: any) => {
        const user = capitalizeFullName(`${comment.userId.firstName} ${comment.userId.lastName}`);
        const formattedDate = format(comment.createdAt, 'dd/MM/yyyy HH:mm:ss'); // Formato de fecha
        const relativeDate = formatDistanceToNow(comment.createdAt, {addSuffix: true, locale: es}); // Fecha relativa
        return {
          _id: comment._id.toString(),
          text: comment.text,
          user,
          date: `${formattedDate} (${relativeDate})`,
          userId: comment.userId._id.toString(),
        };
      }),
    };

    return {
      survey: surveyFound,
    };
  } catch (error) {
    console.log('Error:', error);
    return {
      error: 'Ocurrio un error buscando la encuesta',
    };
  }
};
