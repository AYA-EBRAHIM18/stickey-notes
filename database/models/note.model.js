import { model, Schema, Types } from "mongoose";
const schema = new Schema(
  {
    title: String,
    desc: String,
    user: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: { createdAt: true },
    versionKey: false,
  }
);

export const Note = model("Note", schema);
