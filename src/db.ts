import mongoose, { model, Schema } from "mongoose";

function isconnnected() {
  try {
    mongoose.connect(
      process.env.MONGO_URL as string,
    );
    console.log("Connected to database successfully");
  } catch (err) {
    console.log("Error in connecting to database ", err);
  }
}
isconnnected();

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
});

export const UserModel = model("User", userSchema);

const contentSchema = new Schema(
  {
    title: String,
    link: String,
    tags: [{ type: String, ref: "Tag" }],
    userid: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  },
);

export const contentModel = model("Content", contentSchema);



const shareSchema = new Schema({
    share:String,
    content:{
        type: Schema.Types.ObjectId,
        ref:"Content"
    },
    creator:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
});

export const shareModel=model("Share",shareSchema);

