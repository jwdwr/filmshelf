import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from 'config';

import { User, IUser } from "../models/user";
import userValidator from "../models/validators/user";
import AuthenticationError from '../errors/auth-error';

class UserController {
  /**
   * create a user account
   * @param username
   * @param password
   */
  async signup(username: string, password: string): Promise<{user: IUser, token: string}> {
    await userValidator.validateUser({username, password});

    const saltRounds: number = config.get('bcrypt.saltRounds');
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = new User({username, password: hashedPassword});
    await user.save();

    return {user, token: this.getToken(username)};
  }

  /**
   * get an auth token given user credentials
   * @param username
   * @param password
   */
  async token(username: string, password: string): Promise<string> {
    await userValidator.validateUser({ username, password });

    const validUser = await this.checkCredentials(username, password);
    if (!validUser) throw new AuthenticationError('Invalid user credentials');
    return this.getToken(username);
  }

  /**
   * check that the user's password is valid
   * @param username
   * @param password
   */
  private async checkCredentials(username: string, password: string) {
    const user = await User.findOne({username});
    return await bcrypt.compare(password, user.password);
  }

  /**
   * get a token for some user
   * @param username
   */
  private getToken(username: string): string {
    return jwt.sign({ username }, config.get("jwt.secret"), { expiresIn: "60m" });
  }
}

export default new UserController();