import mongoose from 'mongoose';

const TagSchema = new mongoose.Schema(
    {
        _id:                { type: String, required: true},
        data:               { type: Object, required: true},
        dataType:           { type: String, required: true},
        timeStamp:          { type: Date,   required: true},
        group:              { type: String, required: true},
        enabled:            { type: Boolean,required: true},
        opcPath:            { type: String, required: true},
        readOnly:           { type: Boolean,required: true},
        writePermissions:   { type: Number, required: true},
        sampleTimeMs:       { type: Number, required: true},
        alarms:             { type: Object, required: false},
        history:            { type: Object, required: false},
        unit:               { type: String, required: false}
    }
);

export const TagDB = mongoose.model('tags', TagSchema);