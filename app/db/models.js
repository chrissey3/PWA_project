import { mongoose } from "mongoose";

const { Schema } = mongoose;


const snipSchema = new Schema({
  
  title: String,
  description: String,
  body: String,
  fav: Boolean,
  language: String,
});

export const models = [
  {
    name: "Snip",
    schema: snipSchema,
    collection: "snippet",
  },
];
