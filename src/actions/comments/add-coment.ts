'use server';

import {NewComment} from '@/interfaces/comment';
import {connectDb} from '@/libs/mongodb';
import Comment from '@/models/comment';
import {revalidatePath} from 'next/cache';

export const addComent = async (comment: NewComment) => {
  try {
    await connectDb();
    await new Comment(comment);
    revalidatePath('/dashboard');
    return {success: true, error: null};
  } catch (error) {
    console.log(error);
    return {success: false, error: 'No se pudo agregar el comentario'};
  }
};
