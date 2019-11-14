import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from 'config';

import { User, IUser } from "../models/user";

class UserController {
  async signup(username: string, password: string): Promise<{user: IUser, token: string}> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({username, password: hashedPassword});
    await user.save();

    return {user, token: this.getToken(username)};
  }

  async token(username: string, password: string): Promise<string> {
    const validUser = await this.validateUser(username, password);
    if (!validUser) throw new Error('Invalid user credentials');
    return this.getToken(username);
  }

  private async validateUser(username: string, password: string) {
    const user = await User.findOne({username});
    return await bcrypt.compare(password, user.password);
  }

  private getToken(username: string): string {
    return jwt.sign({ username }, config.get("jwt.secret"), { expiresIn: "60m" });
  }
}

export default new UserController();