import { connect } from "mongoose";

const dbConnection = connect("mongodb://127.0.0.1:27017/notes2").then(() => {
  console.log("Database Connected Successfully.");
});

export default dbConnection;
