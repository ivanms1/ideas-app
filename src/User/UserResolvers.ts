import User from './UserModel';

const UserResolvers = {
  Query: {
    getUser: async (_, { id }) => {
      return await User.findById(id).populate({
        path: 'ideas',
        populate: { path: 'submissions.createdBy' }
      });
    }
  },
  Mutation: {
    createUser: async (_, { input }) => {
      const alreadyUser = await User.findOne({ email: input.email });
      if (alreadyUser) {
        return Error('User already exists');
      }

      const newUser = await User.create(input);
      return newUser.populate({
        path: 'ideas',
        populate: { path: 'submissions.createdBy' }
      });
    },
    login: async (_, { email, password }) => {
      const userToFind = await User.findOne({ email });
      if (!userToFind) {
        return Error('User not found');
      }
      if (password !== userToFind.password) {
        return Error('Wrong Credentials');
      }

      return userToFind.populate({
        path: 'ideas',
        populate: { path: 'submissions.createdBy' }
      });
    }
  }
};

export default UserResolvers;
