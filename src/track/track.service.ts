import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { Track, TrackDocument } from './schema/track.schema';
import { Comment, CommentDocument } from './schema/comment.schema';
import { CreateTrackDTO } from './dto/create-track.dto';

@Injectable()
export class TrackService {
    constructor(
        @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
        @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    ) {}

    async create(dto: CreateTrackDTO): Promise<Track> {
        return await this.trackModel.create({ ...dto, listens: 0 });
    }

    async getAll(): Promise<Track[]> {
        return await this.trackModel.find();
    }

    async getOne(id: ObjectId): Promise<Track> {
        return await this.trackModel.findById(id);
    }

    async delete(id: ObjectId): Promise<ObjectId | string> {
        const track = await this.trackModel.findByIdAndDelete(id);
        return track._id;
    }
}
