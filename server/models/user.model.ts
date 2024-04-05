import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const emailRegexpattern: RegExp = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
export interface IUser extends Document {
  isModified(arg0: string): unknown;
  name: string;
  password: string;
  email: string;
  profilePicture: string;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Please enter at least 8 characters"],
      select: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value: string) {
          emailRegexpattern.test(value);
        },
        message: `{VALUE} is not a valid email address`,
      },
      profilePicture: {
        type: String,
        default:
          "https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg=",
      },
    },
  },
  {
    timestamps: true,
  }
);
UserSchema.pre<IUser>("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const User = model("User", UserSchema);

export default User;
