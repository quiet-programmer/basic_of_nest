import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';

@Controller('ninjas')
export class NinjasController {
    constructor(private readonly ninjaService: NinjasService) { }
    // GET /ninjas -> []
    @Get()
    getNinjas(@Query('weapon') weapon: 'stars' | 'nunChucks') {
        return this.ninjaService.getNinjas(weapon)
    }

    // GET /ninjas/:id -> [....]
    @Get(':id')
    getOneNinja(@Param('id') id: string) {
        try {
            return this.ninjaService.getNinja(+id)
        } catch (error) {
            throw new NotFoundException();
        }
    }

    // POST /ninjas
    @Post()
    createNinja(@Body() createNinjasDto: CreateNinjaDto) {
        return this.ninjaService.createNinja(createNinjasDto);
    }

    // PUT /ninjas/:id -> [.........]
    @Put(':id')
    updateNinjas(@Param('id') id: string, updateNinjaDto: UpdateNinjaDto) {
        return this.ninjaService.updateNinja(+id, updateNinjaDto);
    }

    // DELETE /ninjas/:id
    @Delete(':id')
    deleteNinjas(@Param('id') id: string) {
        return this.ninjaService.removeNinja(+id);
    }
}
