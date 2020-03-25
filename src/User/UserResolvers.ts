import User from './UserModel';

const UserResolvers = {
  Query: {
    getUser: async (_, { id }) => {
      return await User.findById(id).populate('ideas');
    }
  },
  Mutation: {
    createUser: async (_, { input }) => {
      return await User.create(input).populate('ideas');
    },
    login: async (_, { email, password }) => {
      const userToFind = await User.findOne({ email });
      if (!userToFind) {
        return Error('User not found');
      }
      if (password !== userToFind.password) {
        return Error('Wrong Credentials');
      }

      return userToFind.populate('ideas');
    }
  }
};

export default UserResolvers;
