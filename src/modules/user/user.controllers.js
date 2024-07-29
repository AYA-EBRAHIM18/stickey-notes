import { User } from "./../../../database/models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmails } from "../../email/email.js";

const addMinutesToDate = (date, n) => {
  date.setTime(date.getTime() + n * 60_000);
  return date;
};
const signUp = async (req, res) => {
  req.body.otpCode = Math.floor(100000 + Math.random() * 900000);
  req.body.otpExpire = addMinutesToDate(new Date(), 1);
  let user = await User.insertMany(req.body);
  sendEmails(req.body.email);
  user[0].password = undefined;
  res.status(201).json({ message: "Success", user });
};

const signIn = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });

  if (!user || !bcrypt.compareSync(req.body.password, user.password))
    return res.status(401).json({ message: "Incorrect password or email." });

  jwt.sign(
    { userId: user._id, name: user.name, role: user.role },
    "myNameIsAya",
    (err, token) => {
      res.json({ message: "success", token });
    }
  );
};
export { signUp, signIn };
