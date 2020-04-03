import Submission from './SubmissionModel';
import Idea from '../Idea/IdeaModel';

const SubmissionResolvers = {
  Mutation: {
    createSubmission: async (_, { ideaId, userId, input }) => {
      const submissionToCreate = await Submission.create({
        ...input,
        idea: ideaId,
        createdBy: userId
      });
      await Idea.findByIdAndUpdate(ideaId, {
        $push: { submissions: submissionToCreate._id }
      });

      return submissionToCreate
        .populate('createdBy')
        .populate('idea')
        .populate('likes');
    },
    deleteSubmission: async (_, { id, ideaId }) => {
      await Submission.findByIdAndDelete(id);
      await Idea.findByIdAndUpdate(ideaId, { $pull: { submissions: id } });
      return id;
    },
    likeSubmission: async (_, { id, action, userId }) => {
      if ((action !== 'LIKE' && action !== 'DISLIKE') || !id) {
        return Error('Invalid Information');
      }
      if (action === 'LIKE') {
        return await Submission.findByIdAndUpdate(id, {
          $push: { likes: userId }
        })
          .populate('createdBy')
          .populate('likes');
      }
      return await Submission.findByIdAndUpdate(id, {
        $pull: { likes: userId }
      })
        .populate('createdBy')
        .populate('likes');
    }
  }
};

export default SubmissionResolvers;
