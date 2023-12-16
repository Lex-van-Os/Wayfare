import { TripInterface } from "./trip";
import { ObjectId } from "mongodb";

export interface LocationInterface {
  _id?: ObjectId;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  notes: string;
  tripId: TripInterface["_id"];
}

export const locationFilters = [
  "name",
  "description",
  "startDate",
  "endDate",
  "notes",
  "tripId",
];
