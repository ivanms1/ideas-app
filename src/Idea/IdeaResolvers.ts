import Idea from './IdeaModel';
import User from '../User/UserModel';

const IdeaResolvers = {
  Query: {
    getIdeas: async () => {
      return await Idea.find()
        .populate('createdBy')
        .populate('likes')
        .populate('submissions.createdBy');
    },
    getIdea: async (_, { id }) => {
      return await Idea.findById(id)
        .populate('createdBy')
        .populate('likes')
        .populate('submissions.createdBy');
    }
  },
  Mutation: {
    createIdea: async (_, { input, userId }) => {
      const ideaToCreate = await Idea.create(input);

      await User.findByIdAndUpdate(userId, {
        $push: { ideas: ideaToCreate._id }
      });

      return ideaToCreate
        .populate('createdBy')
        .populate('likes')
        .populate('submissions.createdBy');
    },
    deleteIdea: async (_, { id, userId }) => {
      if (!id) {
        return Error('No id Provided');
      }
      await Idea.findByIdAndDelete(id);
      await User.findByIdAndUpdate(userId, { $pull: { ideas: id } });
      return id;
    },
    likeIdea: async (_, { id, action, userId }) => {
      if ((action !== 'LIKE' && action !== 'DISLIKE') || !id) {
        return Error('Invalid Information');
      }
      if (action === 'LIKE') {
        return await Idea.findByIdAndUpdate(id, { $push: { likes: userId } })
          .populate('createdBy')
          .populate('likes')
          .populate('submissions.createdBy');
      }
      return await Idea.findByIdAndUpdate(id, { $pull: { likes: userId } })
        .populate('createdBy')
        .populate('likes')
        .populate('submissions.createdBy');
    }
  }
};

export default IdeaResolvers;
