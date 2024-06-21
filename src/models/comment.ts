import {Schema, model, models, Types} from 'mongoose';

const commentSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    text: String,
    survey: {
      type: Types.ObjectId,
      ref: 'Survey',
      required: true,
    },
  },
  {timestamps: true}
);

const Comment = models.Comment || model('Comment', commentSchema);

export default Comment;
