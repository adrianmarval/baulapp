'use server';
import fs from 'fs';
import path from 'path';
import {getServerSession} from 'next-auth';
import {revalidatePath} from 'next/cache';
import {connectDb} from '@/libs/mongodb';
import User from '@/models/user';

export async function updateUserAvatar(imageFile: File) {
  const session = await getServerSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  if (!imageFile) {
    throw new Error('No file uploaded');
  }

  const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
  const imageName = `profile-${session.user.id}-${Date.now()}.png`;
  const imagePath = path.join(process.cwd(), 'public/uploads', imageName);

  // Guardar la imagen en el sistema de archivos
  fs.writeFileSync(imagePath, imageBuffer);

  // Actualizar la imagen del usuario en la base de datos
  await connectDb();
  const user = await User.findById(session.user.id);
  user.image = `/uploads/${imageName}`;
  await user.save();

  // Revalidar la ruta para actualizar la imagen en la interfaz de usuario
  revalidatePath('/dashboard');

  return {imageUrl: `/uploads/${imageName}`};
}
