
import * as UserService from "../../users/user.service";
import * as MessageService from "../../message/message.service";

export const resolvers = {
  Query: {
    users: async () => {
      return await UserService.getAllUsers();
    },
    messages: async (
      _: any,
      { senderId, receiverId }: { senderId: string; receiverId: string }
    ) => {
      return await MessageService.getMessages(senderId, receiverId);
    },
  },

  Mutation: {
    signup: async (
      _: any,
      {
        name,
        email,
        password,
      }: { name: string; email: string; password: string }
    ) => {
      const existingUser = await UserService.getUserByEmail(email);
      if (existingUser) throw new Error("User already exists");

      return await UserService.createUser({
        name,
        email,
        password,
        role: "USER",
        online: false,
      });
    },

    login: async (
      _: any,
      { email, password }: { email: string; password: string }
    ) => {
      const user = await UserService.getUserByEmail(email);
      if (!user) throw new Error("User not found");

      const isValid = await UserService.comparePassword({
        password,
        userPassword: user.password,
      });
      if (!isValid) throw new Error("Invalid password");
      const token = await UserService.generateAccessToken(
        user._id.toString(),
        user.role
      );
      return { token: token };
    },
  },
};
