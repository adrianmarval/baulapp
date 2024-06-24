'use server';

import {connectDb} from '@/libs/mongodb';
import {surveySchema} from '@/validations/surveySchema';
import Survey from '@/models/survey';
import {z} from 'zod';
import {SurveyInterface} from '@/interfaces/survey';

interface AddSurveyResponse {
  survey?: SurveyInterface;
  error?: string; // Usar tipo unknown para errores desconocidos
}

export const addSurvey = async (survey: z.infer<typeof surveySchema>): Promise<AddSurveyResponse> => {
  try {
    const validationResult = surveySchema.safeParse(survey);

    if (!validationResult.success) {
      return {
        error: 'Se envio informacion errada al intentar agregar la encuesta',
      };
    }

    await connectDb();

    // Verificar si ya existe una encuesta con el mismo host y router
    const existingSurvey = await Survey.findOne({host: survey.host, router: survey.router});

    if (existingSurvey) {
      return {
        survey: {
          _id: existingSurvey._id.toString(),
          host: existingSurvey.host,
          url: existingSurvey.url,
          router: existingSurvey.router,
          comments: existingSurvey.comments.map((comment: any) => comment.toString()),
        },
      };
    }

    const newSurvey = await new Survey({...survey, comments: []});
    await newSurvey.save();
    return {
      survey: {
        _id: newSurvey._id.toString(),
        host: newSurvey.host,
        url: newSurvey.url,
        router: newSurvey.router,
        comments: [], // Add an empty comments array
      },
    };
  } catch (error) {
    console.error(error);
    return {
      error: 'Ocurrio un error al agregar la encuesta',
    };
  }
};
