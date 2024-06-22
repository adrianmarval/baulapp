import {Schema, model, models} from 'mongoose';
import crypto from 'crypto';

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {timestamps: true}
);

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(this.password, salt, 1000, 64, 'sha512').toString('hex');
  this.password = `${salt}:${hash}`;
  console.log('Hashed Password on save:', this.password); // Log para verificar el hash de la contraseña
  next();
});

const User = models.User || model('User', userSchema);
export default User;
