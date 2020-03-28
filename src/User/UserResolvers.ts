import User from './UserModel';
import bcrypt from 'bcryptjs';

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
    signup: async (_, { input }) => {
      const alreadyUser = await User.findOne({ email: input.email });
      if (alreadyUser) {
        return Error('User already exists');
      }
      const hashedPassword = await bcrypt.hashSync(input.password, 10);
      input.password = hashedPassword;

      const newUser = await User.create(input);
      return { status: 'ok', userId: newUser._id };
    },
    login: async (_, { email, password }) => {
      const userToFind = await User.findOne({ email });
      if (!userToFind) {
        return Error('User not found');
      }

      const isMatch = await bcrypt.compare(password, userToFind.password);
      if (!isMatch) {
        return Error('Wrong Credentials');
      }

      return { status: 'ok', userId: userToFind._id };
    }
  }
};

export default UserResolvers;
