import Idea from './IdeaModel';

const IdeaResolvers = {
  Query: {
    getIdeas: async () => {
      return await Idea.find().populate('createdBy');
    },
    getIdea: async (_, { id }) => {
      return await Idea.findById(id).populate('createdBy');
    }
  },
  Mutation: {
    createIdea: async (_, { input }) => {
      return await Idea.create(input).populate('createdBy');
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
        return await Idea.findByIdAndUpdate(id, { $inc: { score: 1 } });
      }
      return await Idea.findByIdAndUpdate(id, { $inc: { score: -1 } });
    }
  }
};

export default IdeaResolvers;
