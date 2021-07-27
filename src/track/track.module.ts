import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { Track, TrackSchema } from './schema/track.schema';
import { Comment, CommentSchema } from './schema/comment.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
        MongooseModule.forFeature([
            { name: Comment.name, schema: CommentSchema },
        ]),
    ],
    controllers: [TrackController],
    providers: [TrackService],
})
export class TrackModule {}
