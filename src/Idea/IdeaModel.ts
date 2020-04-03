import { Schema, model, Document } from 'mongoose';

export interface IIdea extends Document {
  name: string;
  createdBy: string;
  summary: string;
}

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
  submissions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'submission'
    }
  ],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
});

const Idea = model<IIdea>('idea', IdeaSchema);

export default Idea;
