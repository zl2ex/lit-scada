import { Schema, model } from "mongoose"

const baseTagOptions = {
	discriminatorKey: "type",
  	collection: "tags"
};

const BaseTagSchema = new Schema(
    {
        name: String,
        dataType: String,
        group: String,
        enabled: Boolean,
        opcPath: String,
        readOnly: Boolean,
        writePermissions: Number,
        sampleTimeMs: Number,
        alarms: Object,
        history: Object,
        unit: String,
        timeStamp: Date,
    },
    baseTagOptions
);

export const BaseTag = model("baseTag", BaseTagSchema);