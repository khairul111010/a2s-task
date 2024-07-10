import bcrypt from "bcryptjs";
import { User } from "../../../models";
import jwt from 'jsonwebtoken';

const register = async (username: string, email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ username, email, password: hashedPassword });
  return newUser;
};

const login = async (email: string, password: string) => {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    return token;
  };


export default {register, login}