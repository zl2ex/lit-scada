import { Schema, model } from "mongoose";
import { BaseTag } from "./baseTag.js";

export const DigitalIn = BaseTag.discriminator(
    "digitalin", 
    new Schema(
    {
        value: Boolean,
        fault: Boolean
    }
));