import { Schema, model, Document } from 'mongoose';

export interface ISubmission extends Document {
  id: string;
  idea: string;
  url: string;
  repo: string;
  likes: string[];
  createdBy: string;
}

const SubmissionSchema: Schema = new Schema({
  idea: {
    type: Schema.Types.ObjectId,
    ref: 'idea',
    required: true
  },
  url: {
    type: String,
    required: true
  },
  repo: { type: String, required: true },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
    }
  ],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
});

const Submission = model<ISubmission>('submission', SubmissionSchema);

export default Submission;
