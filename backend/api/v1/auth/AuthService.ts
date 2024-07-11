import bcrypt from "bcryptjs";
import { User } from "../../../models";
import jwt from "jsonwebtoken";

const register = async (username: string, email: string, password: string) => {
  const response = await User.findOne({ where: { email } });
  if (response) {
    throw new Error("User already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });


  const _user = { id: user.id, email: user.email, username: user.username };

  return { user: _user, token };
};

const login = async (email: string, password: string) => {
  const user = await User.scope("withPassword").findOne({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid credentials");
  }

  const _user = { id: user.id, email: user.email, username: user.username };

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });

  return { user: _user, token };
};

export default { register, login };
