import {Schema, Types, model, models} from 'mongoose';

const surveySchema = new Schema(
  {
    host: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: false,
    },
    comments: [
      {
        type: Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  {timestamps: true}
);

const Survey = models.Survey || model('Survey', surveySchema);

export default Survey;
