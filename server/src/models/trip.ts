import { ObjectId } from "mongodb";
import { UserInterface } from "./user.ts";

export interface TripInterface {
  _id?: ObjectId;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  userId: UserInterface["_id"];
}

export const tripFilters = [
  "title",
  "description",
  "startDate",
  "endDate",
  "userId",
];
