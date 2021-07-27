import { Body, Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { ObjectId } from 'mongoose';

import { TrackService } from './track.service';
import { CreateTrackDTO } from './dto/create-track.dto';

@Controller(`/tracks`)
export class TrackController {
    constructor(private trackService: TrackService) {}

    @Post()
    create(@Body() dto: CreateTrackDTO) {
        return this.trackService.create(dto);
    }

    @Get()
    getAll() {
        return this.trackService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: ObjectId) {
        return this.trackService.getOne(id);
    }

    @Delete(':id')
    delete(@Param('id') id: ObjectId) {
        return this.trackService.delete(id);
    }
}
