const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (args) {
        const userData = await User.findOne({ _id: args.id })
          .select("-__v -password")
          .populate("savedBooks");
        
        console.log(userData || "no user data")
        return userData;
      }
      console.log("NO USER DATA in CONTEXT")
      throw new AuthenticationError("You are not logged in");
    },
    
    users: async (parent, args, context) => {
      const users = await User.find()

      return users
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    login: async (parent, { email, password }, context) => {
      const user = await User.findOne({ email });
      console.log(user)

      if (!user) {
        throw new AuthenticationError("Username and/or password was invalid.");
      }

      const validPassword = await user.isCorrectPassword(password);

      if (!validPassword) {
        throw new AuthenticationError("Username and/or password was invalid.");
      }

      const token = signToken(user);
      return { token, user };
    },

    saveBook: async (parent, args, context) => {
      try {
        if (context.user) {
          const user = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { savedBooks: { ...args } } },
            { new: true, runValidators: true }
          );
          return user;
        }
        throw new AuthenticationError(
          "Hol' on thar pardner, you need to be logged in to do that!"
        );
      } catch (err) {
        console.log(err);
      }
    },

    removeBook: async (parent, args, context) => {
      try {
        if (context.user) {
          const user = await User.findOneAndUpdate(
            { _id: user._id },
            { $pull: { savedBooks: { bookId: params.bookId } } },
            { new: true }
          );
          return user;
        }
        throw new AuthenticationError(
          "Hol' on thar pardner, you need to be logged in to do that!"
        );
      } catch (err) {}
    },
  },
};

module.exports = resolvers;
