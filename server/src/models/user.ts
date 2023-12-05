import { ObjectId } from "bson";

// Interface to be implemented later
export interface UserInterface {
  _id?: ObjectId;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}