import { Schema, model, Document } from 'mongoose';

export interface IIdea extends Document {
  name: string;
  createdBy: string;
  summary: string;
}

const SubmissionSchema: Schema = new Schema({
  url: {
    type: String,
    required: true
  },
  repo: { type: String, required: true },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
});

const IdeaSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  summary: { type: String, required: true },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
    }
  ],
  submissions: {
    type: [SubmissionSchema],
    default: []
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
});

const Idea = model<IIdea>('idea', IdeaSchema);

export default Idea;
