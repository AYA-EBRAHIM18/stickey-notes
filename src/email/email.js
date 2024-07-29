import nodemailer from "nodemailer";
import { emailHtml } from "./emailHtml.js";
import { User } from "../../database/models/user.model.js";
// import jwt from "jsonwebtoken";
export const sendEmails = async (email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "aya.ebrahim1824@gmail.com",
      pass: "xzgjbeuxvxdbnhjd",
    },
  });
  const user = await User.findOne({ email });
  console.log(user.otpCode);
  const info = await transporter.sendMail({
    from: '"Route course 😊" <aya.ebrahim1824@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello!!", // plain text body
    html: emailHtml(user.otpCode),
  });

  console.log("Message sent: %s", info.messageId);
};
