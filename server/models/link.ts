import { model, Schema, InferSchemaType } from 'mongoose';

const linkSchema = new Schema({
    longLink: { type: String, required: true },
    shortLink: { type: String, required: true },
    title: { type: String },
    description: { type: String},
    imageLink: { type: String },
    userId: { type: Schema.Types.ObjectId, required: true }

}, {timestamps: true});

type Link = InferSchemaType<typeof linkSchema>

export default model<Link>('Link', linkSchema);