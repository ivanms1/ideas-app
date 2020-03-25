import { Schema, model, Document } from 'mongoose';

export interface IIdea extends Document {
  name: string;
  score: number;
  createdBy: string;
}

const IdeaSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
});

const Idea = model<IIdea>('idea', IdeaSchema);

export default Idea;
