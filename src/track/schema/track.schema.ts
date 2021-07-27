import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';

import { Comment } from './comment.schema';

export type TrackDocument = Track & Document;

@Schema()
export class Track {
    @Prop()
    name: string;

    @Prop()
    artist: number;

    @Prop()
    text: string;

    @Prop()
    listens: number;

    @Prop()
    picture: number;

    @Prop()
    audio: number;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
    comments: Comment[];
}

export const TrackSchema = SchemaFactory.createForClass(Track);
