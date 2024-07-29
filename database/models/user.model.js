import { model, Schema } from "mongoose";
import { type } from "os";

const schema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
    },
    otpCode: String,
    otpExpire: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: { updatedAt: false },
    versionKey: false,
  }
);

schema.pre("save", () => {});

export const User = model("User", schema);
