  import { type IUser } from "./user.dto";
  import UserSchema from "./user.schema";
  import jwt from "jsonwebtoken";
  import bcrypt from "bcrypt";
  import { sendEmail } from "../common/helper/sendEmail";
  /**
   * Creates a new user.
   * @param data - The user data to create the user with.
   * @returns A promise that resolves to the newly created user object.
   */
  export const createUser = async (data: {}) => {
    const result = await UserSchema.create({ ...data });
    return result;
  };
  /**
   * Retrieves a user by their email address.
   * @param email - The email address of the user to retrieve.
   * @returns A promise that resolves to the user object if found, or null if not found.
   */

  export const getUserByEmail = async (email: string) => {
    const result = await UserSchema.findOne({ email: email }).lean();
    return result;
  };

  /**
   * Retrieves all users in the database.
   * @returns A promise that resolves to an array of user objects without their passwords.
   */
  export const getAllUsers = async () => {
    const result = await UserSchema.find({ role: "USER" })
      .select("-password")
      .lean();
    return result;
  };

  /**
   * Generates a JSON Web Token for a user.
   * @param _id - The user's unique identifier.
   * @param role - The user's role.
   * @returns A JSON Web Token.
   */
  export const generateAccessToken = async function (_id: string, role: string) {
    const token = jwt.sign(
      { _id: _id, role: role },
      process.env.JWT_SECRET as string,
      {
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY,
      }
    );
    return token;
  };

  /**
   * Generates a JSON Web Token for a user.
   * @param _id - The user's unique identifier.
   * @param role - The user's role.
   * @returns A JSON Web Token.
   */
  export const generateRefreshToken = async function (_id: string, role: string) {
    const token = jwt.sign(
      { _id: _id, role: role },
      process.env.JWT_SECRET as string,
      {
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRY,
      }
    );
    const user = await UserSchema.findByIdAndUpdate(
      { _id: _id },
      { refreshToken: token },
      {
        new: true,
      }
    );
    return token;
  };

  /**
   * Compares a plaintext password with a hashed password.
   * @param password - The plaintext password to compare.
   * @param userPassword - The hashed password to compare with.
   * @returns A promise that resolves to a boolean value indicating whether the passwords match.
   */
  export const comparePassword = async ({
    password,
    userPassword,
  }: {
    password: string;
    userPassword: string;
  }) => {
    return await bcrypt.compare(password, userPassword);
  };

  /**
   * Refreshes an access token and a refresh token for a user based on a given refresh token.
   * @param token - The refresh token to use to refresh the access token and refresh token.
   * @returns A promise that resolves to an object containing the new access token and refresh token.
   * @throws {Error} If the refresh token is invalid.
   * @throws {Error} If the user is not found.
   */
  export const refreshTokens = async function (token: string) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as IUser;

    if (!decoded) {
      throw new Error("Invalid token");
    }
    const user = await UserSchema.findById(decoded._id);
    if (!user) {
      throw new Error("User not found");
    }
    const accessToken = await generateAccessToken(user._id.toString(), user.role);
    const refreshToken = await generateRefreshToken(user._id, user.role);

    return { accessToken, refreshToken };
  };

  /**
   * Logs out a user by removing their refresh token.
   * @param _id - The unique identifier of the user to log out.
   * @returns A promise that resolves to the user object without their password after logging out.
   * @throws {Error} If the user is not found.
   */
  export const logout = async function (_id: string) {
    const user = await UserSchema.findByIdAndUpdate(
      { _id },
      {
        $unset: {
          refreshToken: 1,
        },
      },
      { new: true }
    ).select("-password");
    return user;
  };

  /**
   * Generates a forgot password token and sends it to the user's email.
   * @param email - The email address of the user to send the email to.
   * @param forgotPasswordToken - The forgot password token to generate and store in the user's document.
   * @param forgotPasswordTokenExpiry - The expiration date of the forgot password token.
   * @returns A promise that resolves to true if the email was sent successfully.
   * @throws {Error} If the user is not found.
   */
  export const forgotPassword = async function (
    email: string,
    forgotPasswordToken: string,
    forgotPasswordTokenExpiry: Date | ""
  ) {
    const user = await UserSchema.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    user.forgotPasswordToken = forgotPasswordToken;
    user.forgotPasswordTokenExpiry = forgotPasswordTokenExpiry;

    await user.save();
    const url = `http://localhost:5000/${forgotPasswordToken}`;

    const mailSent = await sendEmail({
      email,
      html: "<p>You can reset your password</p>",
      subject: "Change Password",
      url,
    });
    return mailSent;
  };
  /**
   * Updates the password for a user using a forgot password token.
   * @param token - The forgot password token used to identify the user.
   * @param password - The new password to set for the user.
   * @returns A promise that resolves to the user object after the password is updated.
   * @throws {Error} If the token is not found.
   * @throws {Error} If the password is not provided.
   * @throws {Error} If the user with the specific token is not found.
   * @throws {Error} If the token has expired.
   */
  // export const updatePassword = async function (token: string, password: string) {
  //   if (!token) {
  //     throw new Error("Token not found");
  //   }
  //   if (!password) {
  //     throw new Error("Password is required");
  //   }
  //   const user = await UserSchema.findOne({ forgotPasswordToken: token }).select(
  //     "-password"
  //   );
  //   if (!user) {
  //     throw new Error("User with specific token not found");
  //   }
  //   const date = new Date();

  //   if (date > user.forgotPasswordTokenExpiry) {
  //     throw new Error("Token Expired");
  //   }

  //   user.forgotPasswordToken = "";
  //   user.password = password;
  //   user.forgotPasswordTokenExpiry = "";
  //   await user.save({ validateBeforeSave: true });

  //   return user;
  // };

  export const getUserById = async function (_id: string) {
    const user = await UserSchema.findById(_id);
    return user;
  };
