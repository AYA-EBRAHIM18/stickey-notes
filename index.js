import express from "express";
import dbConnection from "./database/dbConnection.js";
import userRouter from "./src/modules/user/user.routes.js";
import noteRouter from "./src/modules/note/note.routes.js";
import { User } from "./database/models/user.model.js";
import jwt from "jsonwebtoken";
const app = express();
const port = 3000;
app.use(express.json());

app.use("/auth", userRouter);
app.use("/notes", noteRouter);

// app.use("/verify/:token", async (req, res) => {
//   jwt.verify(req.params.token, "aya", async (err, payload) => {
//     await User.findOneAndUpdate(
//       { email: payload.email },
//       { confirmEmail: true }
//     );
//     res.json({ message: "success", email: payload.email });
//   });
// });
app.use("/verifyOtp", async (req, res) => {
  const user = await User.findOne({ otpCode: req.body.otpCode });
  const date = new Date();
  if (!user) {
    res.status(401).json({ message: "OTP doesn't exist" });
  } else if (user.otpExpire < date) {
    res.status(401).json({ message: "OTP is expired" });
  } else if (req.body.otpCode !== user.otpCode) {
    res.status(401).json({ message: "OTP is incorrect" });
  } else {
    await User.findOneAndUpdate(
      { otpCode: req.body.otpCode },
      { confirmEmail: true }
    );
    res.status(201).json({ message: "Email is confirmed" });
  }
});

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
