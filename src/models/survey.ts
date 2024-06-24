import {Schema, model, models} from 'mongoose';

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
    router: {
      type: String,
      required: true,
    },
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
  },
  {timestamps: true}
);

const Survey = models.Survey || model('Survey', surveySchema);

export default Survey;
