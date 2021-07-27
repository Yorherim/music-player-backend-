import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { Track, TrackDocument } from './schema/track.schema';
import { Comment, CommentDocument } from './schema/comment.schema';
import { CreateTrackDTO } from './dto/create-track.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class TrackService {
    constructor(
        @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
        @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    ) {}

    async create(
        dto: CreateTrackDTO,
        picture: string,
        audio: string,
    ): Promise<Track> {
        return await this.trackModel.create({ ...dto, listens: 0 });
    }

    async getAll(): Promise<Track[]> {
        return await this.trackModel.find();
    }

    async getOne(id: ObjectId): Promise<Track> {
        return await this.trackModel.findById(id).populate('comments');
    }

    async delete(id: ObjectId): Promise<ObjectId> {
        const track = await this.trackModel.findByIdAndDelete(id);
        return track._id;
    }

    async addComment(dto: CreateCommentDto): Promise<Comment> {
        const track = await this.trackModel.findById(dto.trackId);
        const comment = await this.commentModel.create({ ...dto });
        console.log(comment);
        track.comments.push(comment._id);
        await track.save();
        return comment;
    }
}
