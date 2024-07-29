import { Note } from "./../../../database/models/note.model.js";
const addNote = async (req, res) => {
  let note = await Note.insertMany(req.body);
  res.json({ message: "success", note });
};

const getAllNotes = async (req, res) => {
  let notes = await Note.find({ user: req.user.userId }).populate(
    "user",
    "name -_id"
  );
  res.json({ message: "success", notes });
};

const updateNote = async (req, res) => {
  let note = await Note.updateMany({ _id: req.params.id }, req.body);
  res.json({ message: "success", note });
};

const deleteNote = async (req, res) => {
  let note = await Note.findByIdAndDelete(req.params.id);
  if (!note) return res.status(404).json({ message: "Note not Found." });
  res.json({ message: "success", note });
};

export { addNote, getAllNotes, updateNote, deleteNote };
