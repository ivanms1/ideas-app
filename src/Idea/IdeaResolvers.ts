import Idea from './IdeaModel';
import User from '../User/UserModel';

const IdeaResolvers = {
  Query: {
    getIdeas: async () => {
      return await Idea.find()
        .populate('createdBy')
        .populate('submissions.createdBy');
    },
    getIdea: async (_, { id }) => {
      return await Idea.findById(id)
        .populate('createdBy')
        .populate('submissions.createdBy');
    }
  },
  Mutation: {
    createIdea: async (_, { input }) => {
      const ideaToCreate = await Idea.create(input);

      await User.findByIdAndUpdate(input.createdBy, {
        $push: { ideas: ideaToCreate._id }
      });

      return ideaToCreate
        .populate('createdBy')
        .populate('submissions.createdBy');
    },
    deleteIdea: async (_, { id }) => {
      if (!id) {
        return Error('No id Provided');
      }
      await Idea.findByIdAndDelete(id);
      return id;
    },
    voteIdea: async (_, { id, action }) => {
      if ((action !== 'UPVOTE' && action !== 'DOWNVOTE') || !id) {
        return Error('Invalid Information');
      }
      if (action === 'UPVOTE') {
        return await Idea.findByIdAndUpdate(id, { $inc: { score: 1 } })
          .populate('createdBy')
          .populate('submissions.createdBy');
      }
      return await Idea.findByIdAndUpdate(id, { $inc: { score: -1 } })
        .populate('createdBy')
        .populate('submissions.createdBy');
    },
    updateSubmissions: async (_, { id, submissions }) => {
      return await Idea.findByIdAndUpdate(id, { $set: { submissions } })
        .populate('createdBy')
        .populate('submissions.createdBy');
    }
  }
};

export default IdeaResolvers;