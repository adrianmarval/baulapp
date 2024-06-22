'use server';

import {revalidatePath} from 'next/cache';
import {connectDb} from '@/libs/mongodb';
import {surveySchema} from '@/validations/surveySchema';
import Survey from '@/models/survey';
import {z} from 'zod';

export const addSurvey = async (survey: z.infer<typeof surveySchema>) => {
  try {
    const validationResult = surveySchema.safeParse(survey);

    if (!validationResult.success) {
      return {success: false, message: 'formato de encuesta invalido', errors: validationResult.error.errors};
    }

    await connectDb();
    await new Survey(survey);
    revalidatePath('/dashboard/identifier');
    return {success: true, message: 'Encuesta registrada'};
  } catch (error) {
    console.log(error);
    return {success: false, message: 'No se pudo registrar la encuesta'};
  }
};
